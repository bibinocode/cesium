import { useEffect } from 'react'
import './App.css'
import * as Cesium from 'cesium'
import '../public/Cesium/Widgets/widgets.css'


window.CESIUM_BASE_URL = '/public/Cesium/'

function App() {


  const initCesium = async () => {
      // 设置自己的token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZmFmOWMzNS01NGM5LTQyZWItOGVkZS02NTQ1NzgwNzJhZDMiLCJpZCI6MTE1NzM1LCJpYXQiOjE3MzY5NDcxNjh9.1qDttoLbk0UUEgZQCNDPK6vf6D0f1tGE12Lxior1c88'
    // 设置默认视角 
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      // 西经,
      89.5,
      // 南纬
      20.4,
      // 东经
      110.4,
      // 北纬 
      61.2
    )
    const viewer = new Cesium.Viewer('cesiumContainer', {  
      // 搜索框控件隐藏
      geocoder: false,
      // 回到默认视角
      homeButton: false,
      // 2D/3D视角切换
      sceneModePicker: false,
      // 图层切换
      baseLayerPicker: false,
      // 帮助按钮
      navigationHelpButton: false,
      // 自转动画
      animation: false,
      // 时间轴
      timeline: false,
      // 全屏按钮
      fullscreenButton: false,
      // 地形设置
      terrainProvider: await Cesium.createWorldTerrainAsync({
        requestVertexNormals: true, // 显示法线
        requestWaterMask:true ,// 显示水面  
      }),
    })
    // 隐藏版权信息
    viewer.cesiumWidget.creditContainer.style.display = 'none'
    // 现实帧率
    viewer.scene.debugShowFramesPerSecond = true

    // 去往北京天安门
    const destinations = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 1000)
    viewer.camera.flyTo({
      // 视角位置
      destination: destinations,
      orientation: {
        // 偏航角度 -> 相当于左右转头
        heading: Cesium.Math.toRadians(0),
        // 俯仰角度 -> 相当于上下俯瞰
        pitch: Cesium.Math.toRadians(-90),
        // 翻滚角度 -> 相当于上下翻滚
        roll: 0.0,
      }
      
    })

    // 添加一个标签实体
    let labelEntity = viewer.entities.add({
      position: destinations,
      label: {
        text: '北京天安门广场',
        font: '30px sans-serif',
        fillColor: Cesium.Color.RED, // 填充颜色
        outlineColor: Cesium.Color.WHITE, // 描边颜色 
        outlineWidth: 2, // 描边宽度
        style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 填写标签的文本并为其添加轮廓
      }
    })

    let fontDelta = 1 // 每次字体变化的阀值
    let fontSize = 40 // 初始字体
    viewer.scene.preUpdate.addEventListener(() => {
      fontSize = fontSize + fontDelta // 字体变化
      if (fontSize >= 50 || fontSize <= 15) {
        fontDelta = -fontDelta // 绝对值
      }
      labelEntity.label.font = `${fontSize}px sans-serif`
    })


    viewer.entities.add({
      position: destinations,
      point: {
        pixelSize: 20, // 默认像素大小,
        color: Cesium.Color.RED, // 颜色
        outlineColor: Cesium.Color.WHITE, // 描边颜色
        outlineWidth: 2, // 描边宽度
        scaleByDistance: new Cesium.NearFarScalar(
          // 相机的下限（最小距离）
          1000,
          // 缩放倍数
          5,
          // 相机的上限（最大距离）
          100000,
          // 缩放倍数
          1
        ),
        translucencyByDistance: new Cesium.NearFarScalar(
          // 相机的下限（最小距离）
          1000,
          // 透明度
          0.5,
          // 相机的上限（最大距离）
          100000,
          // 透明度
          0.5
        ),
      }
    })

  }

  

  useEffect( () => {
    initCesium()
  },[])


  return (
    <>
      <div id='cesiumContainer'></div>
    </>
  )
}

export default App
