import {replotHeatmap} from "./HeatmapView.js";
import {fullscreenOneView, deFullscreen} from "../MultiviewControl/calculateViewportSizes.js";
export function initialize2DHeatmapSetup(viewSetup,views){
	var defaultSetting = {
		background: new THREE.Color( 0,0,0 ),
		controllerEnabledBackground: new THREE.Color( 0.1,0.1,0.1 ),
		eye: [ 0, 0, 150 ],
		up: [ 0, 0, 1 ],
		fov: 45,
		mousePosition: [0,0],
		viewType: '2DHeatmap',
		//plotX: 'gamma',
		//plotY: 'epxc',
		//plotXTransform: 'linear',
		//plotYTransform: 'log10',
		controllerEnabled: false,
		controllerZoom : true,
		controllerRotate : false,
		controllerPan : true,
		options: new function(){
			this.numPerSide = 100;
			this.pointCloudAlpha = 1;
			this.pointCloudSize = 3.0;
			this.plotX = viewSetup.plotX;
			this.plotY = viewSetup.plotY;
			this.plotXTransform = viewSetup.plotXTransform;
			this.plotYTransform = viewSetup.plotYTransform;
			this.colorMap = 'rainbow';
			this.resetCamera = function(){viewSetup.controller.reset();};
			this.replotHeatmap = function(){replotHeatmap(viewSetup)};
			this.fullscreen = function(){
								fullscreenOneView(views,viewSetup);
							};
			this.defullscreen = function(){deFullscreen(views);};
			this.fullscreenBoolean = false;
			this.toggleFullscreen = function(){
										if (!this.fullscreenBoolean){
											fullscreenOneView(views,viewSetup);
											this.fullscreenBoolean = !this.fullscreenBoolean;
										}
										else {
											deFullscreen(views);
											this.fullscreenBoolean = !this.fullscreenBoolean;
										}
									};
			this.legendX = 8;
			this.legendY = -4;
			this.legendWidth  = 0.5;
			this.legendHeight = 6;
			this.legendTick = 5;
			this.legendFontsize = 55;
		}
	}

	viewSetup = extendObject(viewSetup,defaultSetting);
	//viewSetup = defaultSetting;

}

function extendObject(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}