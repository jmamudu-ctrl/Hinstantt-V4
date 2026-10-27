import React from 'react';

// Plays a video with its flat backdrop colour keyed out, so whatever sits behind the
// element (the glass frame and the hero animation) shows through. The key colour is
// read from the frame's top-left corner, which in our product videos is always the
// plain backdrop. Without WebGL the <video> is shown as-is.

const VERT = `
attribute vec2 p;
varying vec2 v;
void main(){ v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform sampler2D t;
varying vec2 v;
void main(){
  vec3 key = texture2D(t, vec2(0.004, 0.996)).rgb;
  vec3 c = texture2D(t, v).rgb;
  vec3 d = abs(c - key);
  float a = smoothstep(0.012, 0.03, max(max(d.r, d.g), d.b));
  gl_FragColor = vec4(c * a, a);
}
`;

// width/height: the video's pixel size, so the canvas lays out at the right aspect
// before the first frame arrives.
const KeyedVideo = React.forwardRef(function KeyedVideo({ className = '', src, poster, width, height }, ref) {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [keyed, setKeyed] = React.useState(false);
  const [fallback, setFallback] = React.useState(false);
  React.useImperativeHandle(ref, () => videoRef.current);

  React.useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const gl = canvas && canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false });
    if (!gl) { setFallback(true); return; }

    const sh = (type, s) => { const x = gl.createShader(type); gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFallback(true); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let alive = true, handle = 0, first = true;
    const draw = () => {
      if (video.readyState < 2) return;
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (first) { first = false; setKeyed(true); }
    };
    const hasRVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
    const loop = () => {
      if (!alive) return;
      draw();
      handle = hasRVFC ? video.requestVideoFrameCallback(loop) : requestAnimationFrame(loop);
    };
    const onData = () => draw();
    video.addEventListener('loadeddata', onData);
    loop();

    return () => {
      alive = false;
      if (hasRVFC) video.cancelVideoFrameCallback(handle); else cancelAnimationFrame(handle);
      video.removeEventListener('loadeddata', onData);
      gl.deleteTexture(tex); gl.deleteBuffer(buf); gl.deleteProgram(prog);
      gl.deleteShader(vs); gl.deleteShader(fs);
    };
  }, [src]);

  // The canvas takes the video's place in the layout; the video keeps playing as a
  // 1px source (kept on screen so browsers don't pause it as off-screen).
  return (
    <React.Fragment>
      <video ref={videoRef} className={fallback ? className : 'kv-src'}
             autoPlay muted loop playsInline preload="auto" poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
      {!fallback && (
        <canvas ref={canvasRef} width={width} height={height} aria-hidden="true"
                className={`${className} kv-canvas ${keyed ? 'is-keyed' : ''}`} />
      )}
    </React.Fragment>
  );
});

export default KeyedVideo;
