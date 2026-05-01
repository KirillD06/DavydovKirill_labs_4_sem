import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class RocketModelComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(discovererCard) {
    return `
      <article class="card shadow-sm border-0 p-3 model-card">
        <h3 class="h5 mb-2">3D GIF</h3>
        <p class="text-secondary mb-3">Потяните мышью, чтобы вращать</p>
        <div id="model-canvas-${discovererCard.id}" class="model-canvas"></div>
      </article>
    `;
  }

  createGifPlane(initialTexture) {
    const frameGeometry = new THREE.BoxGeometry(2.48, 2.48, 0.08);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x294a78,
      metalness: 0.2,
      roughness: 0.55
    });

    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

    const screenGeometry = new THREE.PlaneGeometry(2.36, 2.36);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: initialTexture,
      side: THREE.DoubleSide,
      toneMapped: false
    });

    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = 0.045;
    frameMesh.add(screenMesh);

    return { frameMesh, screenMaterial };
  }

  createVideoElement(videoUrl) {
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.defaultMuted = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.preload = "auto";
    videoElement.crossOrigin = "anonymous";
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("webkit-playsinline", "");
    videoElement.style.display = "none";
    return videoElement;
  }

  renderVideoError(canvasContainer) {
    canvasContainer.insertAdjacentHTML(
      "beforeend",
      `<p class="text-warning small mt-2 mb-0">GIF не запустился автоматически. Кликните по модели.</p>`
    );
  }

  attachVideoTexture(screenMaterial, videoElement) {
    const videoTexture = new THREE.VideoTexture(videoElement);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    screenMaterial.map = videoTexture;
    screenMaterial.needsUpdate = true;
    return videoTexture;
  }

  mountModel(canvasContainer, discovererCard) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f7ff);

    const camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(2.4, 1.8, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.minDistance = 1.8;
    controls.maxDistance = 6;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 3, 2);
    scene.add(keyLight);

    const textureLoader = new THREE.TextureLoader();
    const fallbackTexture = textureLoader.load(discovererCard.rocketGifUrl);
    fallbackTexture.colorSpace = THREE.SRGBColorSpace;
    fallbackTexture.minFilter = THREE.LinearFilter;
    fallbackTexture.magFilter = THREE.LinearFilter;

    const { frameMesh, screenMaterial } = this.createGifPlane(fallbackTexture);
    scene.add(frameMesh);

    const videoUrl = discovererCard.rocketVideoUrl || discovererCard.rocketGifUrl;
    const videoElement = this.createVideoElement(videoUrl);
    canvasContainer.appendChild(videoElement);

    let videoTexture = null;

    videoElement.addEventListener(
      "playing",
      () => {
        if (!videoTexture) {
          videoTexture = this.attachVideoTexture(screenMaterial, videoElement);
        }
      },
      { once: true }
    );

    const startVideo = () => {
      videoElement.play().catch(() => {});
    };

    videoElement.load();
    startVideo();
    renderer.domElement.addEventListener("pointerdown", startVideo);
    window.addEventListener("touchstart", startVideo, { passive: true, once: true });
    videoElement.addEventListener("error", () => this.renderVideoError(canvasContainer), { once: true });

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", () => {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  render(discovererCard) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(discovererCard));

    const canvasContainer = document.getElementById(`model-canvas-${discovererCard.id}`);
    this.mountModel(canvasContainer, discovererCard);
  }
}
