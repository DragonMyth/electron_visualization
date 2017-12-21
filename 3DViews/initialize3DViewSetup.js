import {fullscreenOneView, deFullscreen} from "../MultiviewControl/calculateViewportSizes.js";
import {insertLegend, removeLegend, changeLegend} from "../MultiviewControl/colorLegend.js";
export function initialize3DViewSetup(viewSetup,views,plotSetup){
	var gridSpacing = viewSetup.gridSpacing;
	var systemDimension = viewSetup.systemDimension;
	var xCoordMin = systemDimension["x"][0], xCoordMax = systemDimension["x"][1];
	var yCoordMin = systemDimension["y"][0], yCoordMax = systemDimension["y"][1];
	var zCoordMin = systemDimension["z"][0], zCoordMax = systemDimension["z"][1];
	var xSteps = (xCoordMax - xCoordMin)/gridSpacing.x;
	var ySteps = (yCoordMax - yCoordMin)/gridSpacing.y;
	var zSteps = (zCoordMax - zCoordMin)/gridSpacing.z;
	var xPlotMin = 0.0 - (xSteps/2.0), xPlotMax =  0.0 + (xSteps/2.0);
	var yPlotMin = 0.0 - (ySteps/2.0), yPlotMax =  0.0 + (ySteps/2.0);
	var zPlotMin = 0.0 - (zSteps/2.0), zPlotMax =  0.0 + (zSteps/2.0);



	var defaultSetting = {
		//left: 0,
		//top: 0,
		//width: 0.6,
		//height: 0.5,
		background: new THREE.Color( 0,0,0 ),
		controllerEnabledBackground: new THREE.Color( 0.1,0.1,0.1 ),
		eye: [ 0, 0, 800 ],
		up: [ 0, 1, 0 ],
		fov: 100,
		mousePosition: [0,0],
		//viewType: '3Dview',
		//moleculeName: 'CO2',
		//dataFilename: "data/CO2_B3LYP_0_0_0_all_descriptors.csv",
		controllerEnabled: false,
		controllerZoom : true,
		controllerRotate : true,
		controllerPan : true,
		xPlotScale : d3.scaleLinear().domain([xCoordMin,xCoordMax]).range([xPlotMin,xPlotMax]),
		yPlotScale : d3.scaleLinear().domain([yCoordMin,yCoordMax]).range([yPlotMin,yPlotMax]),
		zPlotScale : d3.scaleLinear().domain([zCoordMin,zCoordMax]).range([zPlotMin,zPlotMax]),
		options: new function(){
			this.backgroundColor = "#000000";
			this.pointCloudParticles = 1000;
			this.pointCloudColorSettingMax = 1.2;
			this.pointCloudColorSettingMin = 0.0;
			this.pointCloudAlpha = 1;
			this.pointCloudSize = 1;
			/*this.boxParticles = 200;
			this.boxColorSetting = 10.0;
			this.boxSize = 10;
			this.boxOpacity = 1;
			this.pointMatrixParticles = 100;
			this.pointMatrixColorSettingMax = 1.2;
			this.pointMatrixColorSettingMin = 0.0;
			this.pointMatrixAlpha = 1;
			this.pointMatrixSize = 10;*/
			this.x_low = -100;
			this.x_high = 100;
			this.y_low = -100;
			this.y_high = 100;
			this.z_low = -100;
			this.z_high = 100;
			this.x_slider = 0;
			this.y_slider = 0;
			this.z_slider = 0;
			this.densityCutoff = -3;
			this.view = 'pointCloud';
			this.moleculeName = viewSetup.moleculeName;
			this.propertyOfInterest = plotSetup["pointcloudDensity"];
			this.density = plotSetup["pointcloudDensity"];
			this.colorMap = 'rainbow';
			//this.dataFilename = "data/CO2_B3LYP_0_0_0_all_descriptors.csv";
			this.planeVisibilityU = false;
			this.planeVisibilityD = false;
			this.planeVisibilityR = false;
			this.planeVisibilityL = false;
			this.planeVisibilityF = false;
			this.planeVisibilityB = false;
			this.planeOpacity = 0.05;
			this.resetCamera = function(){viewSetup.controller.reset();};
			this.fullscreen = function(){
								fullscreenOneView(views,viewSetup);
							};
			this.defullscreen = function(){deFullscreen(views);};
			this.fullscreenBoolean = false;
			this.toggleFullscreen = function(){
										if (!viewSetup.options.fullscreenBoolean){
											fullscreenOneView(views,viewSetup);
											viewSetup.options.fullscreenBoolean = !viewSetup.options.fullscreenBoolean;
										}
										else {
											deFullscreen(views);
											viewSetup.options.fullscreenBoolean = !viewSetup.options.fullscreenBoolean;
										}
									};
			this.legendX = 8;
			this.legendY = -4;
			this.legendWidth  = 0.5;
			this.legendHeight = 6;
			this.legendTick = 5;
			this.legendFontsize = 55;
			this.legendShownBoolean = true;
			this.toggleLegend = function(){
									if (!viewSetup.options.legendShownBoolean){
										insertLegend(viewSetup);
										viewSetup.options.legendShownBoolean = !viewSetup.options.legendShownBoolean;
									}
									else {
										removeLegend(viewSetup);
										viewSetup.options.legendShownBoolean = !viewSetup.options.legendShownBoolean;
									}
								};

		}
	}

	viewSetup = extendObject(viewSetup,defaultSetting);


}

function extendObject(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}