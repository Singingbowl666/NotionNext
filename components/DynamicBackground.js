import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const DynamicBackground = () => {
    // 初始化粒子引擎
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            className="fixed inset-0 z-[-1] pointer-events-none"
            options={{
                background: {
                    color: { value: "#0a0a1a" }, // 深夜蓝背景
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab", // 鼠标经过时产生连接，模拟“注意力机制”
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            links: { opacity: 0.6, color: "#bd00ff" } // 连接线颜色
                        },
                    },
                },
                particles: {
                    color: { value: "#00f2ff" }, // 粒子颜色（激光蓝）
                    links: {
                        color: "#00f2ff",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 0.6, // 缓慢移动，像思考中的神经网络
                        direction: "none",
                        outModes: { default: "bounce" },
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 60, // 粒子密度
                    },
                    opacity: { value: 0.3 },
                    shape: {
                        type: ["circle", "triangle"], // 圆形代表神经元，三角形代表机器人的网格化感知
                    },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            }}
        />
    );
};

export default DynamicBackground;