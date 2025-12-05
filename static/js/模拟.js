// 模拟脚本：用于在页面上触发模拟 dt 指令，方便测试地图切换逻辑
(function(){
    function 发送模拟(dtValue){
        // 设置全局测试模式标记
        if (typeof window !== 'undefined') {
            window._雷达测试模式 = true;
        }
        
        // 新格式 payload: { dt: string, st: { ht: [...], b: [...], s: [...] } }
        const sample = {
            dt: dtValue,
            st: {
                ht: [
                    // 本人
                    {
                        stmz: "本人",
                        mc: "乌鲁鲁",
                        zy: "乌鲁鲁",
                        wq: "AK47",
                        xl: 100,
                        x: 63932.6,
                        y: 20054.8,
                        pyx: 0.001,
                        pyy: 1.0,
                        t: 3,
                        j: 2,
                        tnj: 80,
                        jnj: 60,
                        jl: 0,
                        gdc: 0,
                        db: 1
                    },
                    // 队友
                    {
                        stmz: "队友",
                        mc: "队友A",
                        zy: "克莱尔",
                        wq: "AWM",
                        xl: 85,
                        x: 64000.0,
                        y: 20100.0,
                        pyx: 0.5,
                        pyy: 0.8,
                        t: 2,
                        j: 3,
                        tnj: 90,
                        jnj: 75,
                        jl: 0,
                        gdc: 0,
                        db: 1
                    },
                    // 敌人队伍2
                    {
                        stmz: "敌人",
                        mc: "敌人1",
                        zy: "红狼",
                        wq: "M416",
                        xl: 60,
                        x: 65000.0,
                        y: 21000.0,
                        pyx: -0.3,
                        pyy: 0.7,
                        t: 1,
                        j: 1,
                        tnj: 50,
                        jnj: 40,
                        jl: 0,
                        gdc: 0,
                        db: 2
                    },
                    // 敌人队伍3
                    {
                        stmz: "敌人",
                        mc: "敌人2",
                        zy: "威龙",
                        wq: "SCAR",
                        xl: 45,
                        x: 66000.0,
                        y: 22000.0,
                        pyx: 0.8,
                        pyy: -0.2,
                        t: 2,
                        j: 2,
                        tnj: 60,
                        jnj: 55,
                        jl: 0,
                        gdc: 0,
                        db: 3
                    },
                    // 人机
                    {
                        stmz: "人机",
                        mc: "人机Bot",
                        zy: "人机",
                        wq: "UMP45",
                        xl: 30,
                        x: 67000.0,
                        y: 23000.0,
                        pyx: 0.0,
                        pyy: 1.0,
                        t: 0,
                        j: 0,
                        tnj: 0,
                        jnj: 0,
                        jl: 0,
                        gdc: 0,
                        db: 0
                    }
                ],
                b: [
                    {
                        ss: "玩家盒子",
                        x: 53590,
                        y: 44503,
                        jl: 412,
                        gd: -41
                    }
                ],
                s: [
                    {
                        mc: "鼠标",
                        lv: 1,
                        jz: 877,
                        x: 65612.6,
                        y: 24167.3,
                        jl: 68,
                        gdc: 0
                    }
                ]
            }
        };

        const payload = sample;
        // 如果全局套接字存在且处于 open 状态，直接触发 onmessage 回调以模拟服务器消息
        if (typeof 套接字 !== 'undefined' && 套接字 && 套接字.readyState === WebSocket.OPEN) {
            const event = { data: JSON.stringify(payload) };
            if (typeof 套接字.onmessage === 'function') 套接字.onmessage(event);
        } else {
            // 离线模式或WebSocket未连接：直接调用雷达消息处理函数
            try {
                const event = { data: JSON.stringify(payload) };
                
                // 优先使用新的雷达消息处理函数
                if (typeof window.雷达消息处理 === 'function') {
                    window.雷达消息处理(event);
                } else {
                    // 兼容性处理：如果雷达脚本还未加载，尝试其他方式
                    if (typeof 图片 !== 'undefined') {
                        const mapMap = {
                            "hangtian_Main": "../static/media/ht.jpg",
                            "Kiki_Main": "../static/media/cg.jpg",
                            "Chimera_Main": "../static/media/db.jpg"
                        };
                        if (mapMap[dtValue]) {
                            图片.src = mapMap[dtValue];
                            if (typeof 地图已收到 !== 'undefined') 地图已收到 = true;
                        }
                    }
                    
                    // 如果套接字的onmessage存在，调用它
                    if (typeof 套接字 !== 'undefined' && typeof 套接字.onmessage === 'function') {
                        套接字.onmessage(event);
                    } else if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
                        // 否则，尝试将数据放到全局变量并调用绘制（兼容性保底）
                        window._radar_offline_payload = payload;
                        if (typeof 绘制地图 === 'function') 绘制地图();
                    }
                }
            } catch (e) { 
                // 模拟切换失败
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const btnHT = document.getElementById('sim-ht');
        const btnCG = document.getElementById('sim-cg');
        const btnDB = document.getElementById('sim-db');
        const btnBoxes = document.getElementById('sim-boxes');
        
        btnHT && btnHT.addEventListener('click', () => 发送模拟('hangtian_Main'));
        btnCG && btnCG.addEventListener('click', () => 发送模拟('Kiki_Main'));
        btnDB && btnDB.addEventListener('click', () => 发送模拟('Chimera_Main'));
        
        // 测试盒子按钮事件
        btnBoxes && btnBoxes.addEventListener('click', () => {
            if (typeof 生成测试盒子 === 'function') {
                生成测试盒子();
            }
        });
    });
})();
