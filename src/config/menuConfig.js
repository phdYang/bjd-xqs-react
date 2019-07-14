const menuList = [
    {
        title: '首页',
        key: '/admin/home'
    },
    {
        title: '台账管理',
        key: '/AccountManager',
        children:[
            {
                title: '传感器管理',
                key: '/AccountManager/ShowSensor'
            },
            {
                title: '设备管理',
                key: '/AccountManager/ShowDevice'
            }
        ]
    },
    {
        title:'监测数据管理',
        key:'/MonitorDataManager',
        children:[
            {
                title: '监测数据查询',
                key: '/MonitorDataManager/ShowMonitorData'
            },
            {
                title: '监测数据检验',
                key: '/MonitorDataManager/DataCheck'
            }
        ]
    },
    {
        title:'工务辅助决策',
        key:'/DecisionManager',
        children:[
            {
                title:'监测数据预测',
                key:'/DecisionManager/PredictManager',
                children:[
                    {
                        title:'梁端伸缩位移预测',
                        key:'/DecisionManager/PredictManager/showLDSSPredictData'
                    },
                    {
                        title:'钢轨纵向爬行预测',
                        key:'/DecisionManager/PredictManager/showGGZXPredictData'
                    },
                    {
                        title:'尖轨尖端伸缩预测',
                        key:'/DecisionManager/PredictManager/showJGJDPredictData'
                    },
                    {
                        title:'钢轨附加应力预测',
                        key:'/DecisionManager/PredictManager/showGGFJPredictData'
                    }
                ]
            },
            { 
                title:'数据异常报警',
                key:'/DecisionManager/AlarmManager',
                children:[
                    {
                        title:'报警设置',
                        key:'/DecisionManager/AlarmManager/ShowAlarmSetting'
                    },
                    {
                        title:'报警查询',
                        key:'/DecisionManager/AlarmManager/showAlarmLog'
                    }
                ]
            }
        ]
    },
    {
        title:'系统设置',
        key:'/SystemManager',
        children:[
            {
                title:'用户设置',
                key:'/SystemManager/ShowUser'
            },
            {
                title:'用户日志查询',
                key:'/SystemManager/UserLog'
            }
        ]
    }
];
export default menuList;