const js3dModelCdnUrl = '/cdn/model/js-3d/';
const js3dModelImg01 = js3dModelCdnUrl + 'images/01.png';

const js3dModel = {
    // 图片列表
    imgsArr: [],

    // 图片加载
    imgLoad: async function () {
        const pArr = [];
        this.imgsArr.forEach((item) => {
            const p = new Promise((reslove) => {
                const img = new Image();
                img.src = item;
                img.onload = () => {
                    reslove(img);
                };
            });
            pArr.push(p);
        });
        const res = await Promise.all(pArr);
        return res;
    },

    //模型加载
    modelLoad: function (props) {
        const { THREE, TWEEN, OrbitControls } = props;
        const el = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        el.style.cssText = `width:${winWidth}px;height:${winHeight}px`;

        // 相机
        const camera = new THREE.PerspectiveCamera(20, winWidth / winHeight, 0.1, 1000);
        // 设置相机坐标
        camera.position.set(150, 50, 300); // 侧面
        // camera.position.set(0, 50, 300); // 正面

        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        // 设置渲染器的颜色和大小
        renderer.setClearColor('#000');
        // renderer.setClearAlpha(0);
        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // 高清设置

        // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
        // 这就是渲染器用来显示场景给我们看的<canvas>元素
        document.body.appendChild(renderer.domElement);

        // 鼠标控制旋转
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        // orbitControls.autoRotate = false;
        // orbitControls.enableZoom = false;
        // orbitControls.minDistance = 200; // 最大缩放值，值越小模型越大
        orbitControls.maxDistance = 500; // 最小缩放值，值越大模型越小
        orbitControls.maxPolarAngle = Math.PI * 0.5; // 限制鼠标拖拽角度
        orbitControls.enablePan = false; // 禁止鼠标右键拖拽

        // 场景
        const scene = new THREE.Scene();

        // ------------------------------------------- 3d模型搭建 start---------------------------------------------
        const bodyPositiveTexture = new THREE.TextureLoader().load(js3dModelImg01);

        bodyPositiveTexture.repeat.set(1, 1);
        bodyPositiveTexture.wrapS = THREE.RepeatWrapping;
        bodyPositiveTexture.wrapT = THREE.RepeatWrapping;
        const bodyPositiveMaterial = new THREE.MeshLambertMaterial({
            map: bodyPositiveTexture,
            transparent: true,
            opacity: 0.8,
        });

        const whiteBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const whiteMesh = new THREE.Mesh(whiteBoxGeometry, bodyPositiveMaterial);
        whiteMesh.name = '白色立方体';
        scene.add(whiteMesh);

        // ------------------------------------------- 3d模型搭建 end---------------------------------------------

        // 元素点击事件
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        // 点击更改颜色
        renderer.domElement.onclick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            console.log(intersects);
            if (intersects.length > 0) {
                intersects.forEach((item) => {
                    if (item.object.name === '白色立方体') {
                        window.ddddd(item.object.name);
                    }
                });
            }
        };

        // 设置光源
        const light = new THREE.DirectionalLight('#ffffff', 0.5);
        light.position.set(400, 200, 300);
        scene.add(light);
        scene.add(new THREE.AmbientLight('#ffffff', 0.5));

        // 亮光光源映射
        const pointLight = new THREE.PointLight('#ffffff', 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // 添加渲染元素
        el.append(renderer.domElement);

        function render() {
            // 动画循环渲染
            requestAnimationFrame(render);
            // 渲染到页面上
            renderer.render(scene, camera);

            TWEEN.update();
        }
        render();

        // onresize 事件会在窗口被调整大小时发生
        window.onresize = () => {
            const newWindowWidth = window.innerWidth;
            const newWindowHeight = window.innerHeight;
            el.style.cssText = `width:${newWindowWidth};height:${newWindowHeight}`;
            renderer.setSize(newWindowWidth, newWindowHeight);
            camera.aspect = newWindowWidth / newWindowHeight;
            camera.updateProjectionMatrix();
        };
    },

    // paramsObj 包含了此函数里需要的对象
    init: async function (props) {
        await this.imgLoad();
        this.modelLoad(props);
    },
};
