/*
 * S6 1.2 - 3D Mobile Touch Slider
 * http://www.idangero.us/sliders/s6/
 *
 * Copyright 2012, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under iDangero.us Regular License (RL):
 * http://www.idangero.us/index.php?content=article&id=21
 *
 * Updated on: April 11, 2012
*/
(function($){
$.fn.s6 = function(params){
	var _this = $(this)
	if ( _this.length==0 ) return _this;
	//Default Parameters
	params = params || {};
	params.speed = params.speed || 500
	
	if (params.simulateTouch === false) params.simulateTouch = false
	else params.simulateTouch = true
	
	params.freeMode = params.freeMode || false
	params.perspective = params.perspective || 1000
	params.mode = params.mode || 'horizontal'
	params.slideClass = params.slideClass || 's6-slide'
	params.wrapperClass = params.wrapperClass || 's6-wrapper'
	params.paginationClass = params.paginationClass || 's6-pagination-switch'
	params.paginationActiveClass = params.paginationActiveClass || 's6-active-switch'
	
	params.autoPlay = params.autoPlay || false
	
	if (params.followFinger === false) params.followFinger = false
	else params.followFinger = true
	
	if (params.createBackFaces === false) params.createBackFaces = false
	else params.createBackFaces = true
	if (params.createPagination === false) params.createPagination = false
	else params.createPagination = true
	if (params.setPerspective !== false && params.setPerspective !== true) params.setPerspective = true
	
	params.dynamicShadow = params.dynamicShadow || false
	params.dynamicShadowOffset = params.dynamicShadowOffset || 20
	params.dynamicShadowScale = params.dynamicShadowScale || 0.9
	//Some default vars
	var isScrolling;
	var isHorizontal = params.mode=='horizontal';
	
	//Check to prevent double init
	if ( _this.find('.s6-slide-top').length>0 ) return
	
	//3D Test
	function isSupport3D() {
		var div = document.createElement('div');
		div.id = 'test3d';
			
		var s3d=false;	
		if("webkitPerspective" in div.style) s3d=true;
		if("MozPerspective" in div.style) s3d=true;
		if("OPerspective" in div.style) s3d=true;
		if("MsPerspective" in div.style) s3d=true;
		if("perspective" in div.style) s3d=true;
		/* Test with Media query for Webkit to prevent FALSE positive*/	
		if(s3d && ("webkitPerspective" in div.style) ) {
			var st = document.createElement('style');
			st.textContent = '@media (-webkit-transform-3d), (transform-3d), (-moz-transform-3d), (-o-transform-3d), (-ms-transform-3d) {#test3d{height:5px}}'
			document.getElementsByTagName('head')[0].appendChild(st);
			document.body.appendChild(div);
			s3d = div.offsetHeight === 5;;
			st.parentNode.removeChild(st);
			div.parentNode.removeChild(div);
		}
		return s3d;
	}
	if (!isSupport3D()) {
		if (window.Swiper) {
			_this.css({overflow:'hidden'});
			_this.find('.'+params.slideClass)
				.css('float','left')
				.css('position','relative')
				.css('visibility','visible')
			return new Swiper(_this.selector, params)
		}
	}
	
	//Default Faces BG
	params.faces = params.faces || {};
	params.faces.left = params.faces.left || '#555'
	params.faces.right = params.faces.right || '#888'
	params.faces.top = params.faces.top || '#888'
	params.faces.bottom = params.faces.bottom || '#555'
	
	//s6 object
	var s6 = {
		container : _this,
		wrapper : _this.find('.' + params.wrapperClass),
		slides : _this.find('.' + params.slideClass),
		params : params,
		touches : {},
		rotates : {},
		times : {},
		isSupport3D : isSupport3D(),
		activeSlide : 0
		
	}
	//isHorizontal Function
	function isH() {
		return s6.params.mode=='horizontal'
	}
	//Init Slider Dimensions
	s6.init = function() {
		s6.width = _this.width()
		s6.height = _this.height()
		s6.wrapper.css({
			width : s6.width,
			height: s6.height	
		})
		s6.wrapper.find('.' + params.slideClass).css({
			width: s6.width,
			height: s6.height
		})
	}
	s6.init()
	
	//Set Transform styles
	if (s6.params.setPerspective===true) {
		s6.container.css({
			'-webkit-perspective': s6.params.perspective,
			'-moz-perspective': s6.params.perspective,
			'-ms-perspective': s6.params.perspective,
			'-o-perspective': s6.params.perspective,
			'perspective': s6.params.perspective
		})
	}
	s6.wrapper.find('.' + params.slideClass).css({
		width: s6.width,
		height: s6.height
	})
	
	//Check number of Slides to enable infinite mode
	
	s6.numOfSlides = s6.wrapper.find('.s6-slide').length
	if (s6.numOfSlides>4) s6.inf = true
	else s6.inf = false
	
	//Hide All Slides in infinite mode on initialization
	if (s6.inf) {
		s6.slides.not(':eq(0)').hide()
	}
	
	//
	function setSide(e,side) {
		var t = '';
		switch(side) {
			case 'front' : {
				t =  'translate3d(0px, 0px, 0px) rotateY(0deg)';
			};
			break;
			case 'right': {
				if (isH()) t =  'translate3d('+(s6.width/2)+'px, 0px, '+(-s6.width/2)+'px) rotateY(90deg)'
				else t = 'translate3d('+(s6.width-s6.height/2)+'px, 0px, '+(-s6.height/2)+'px) rotateY(90deg)'
			};
			break;
			case 'back': {
				if (isH()) t = 'translate3d(0px, 0px, '+(-s6.width)+'px) rotateY(180deg)';
				else t = 'translate3d(0px, 0px, '+(-s6.height)+'px) rotateX(180deg)';
			};
			break;
			case 'left': {
				if (isH()) t = 'translate3d('+(-s6.width/2)+'px, 0px, '+(-s6.width/2)+'px) rotateY(-90deg)';
				else t = 'translate3d('+(-s6.height/2)+'px, 0px, '+(-s6.height/2)+'px) rotateY(-90deg)';
			};
			break;
			case 'top': {
				if (isH()) t = 'translate3d(0px, '+(-s6.width/2)+'px, '+(-s6.width/2)+'px) rotateX(90deg)';
				else t = 'translate3d(0px, '+(-s6.height/2)+'px, '+(-s6.height/2)+'px) rotateX(90deg)';
			};
			break;
			case 'bottom': {
				if (isH()) t = 'translate3d(0px, '+(s6.height-s6.width/2)+'px, '+(-s6.width/2)+'px) rotateX(-90deg)';
				else t = 'translate3d(0px, '+(s6.height/2)+'px, '+(-s6.height/2)+'px) rotateX(-90deg)'
				
			};
			break;
		}
		var es=e.style
		es.webkitTransform = es.MsTransform = es.MozTransform = es.OTransform = es.transform = t 
	}
	
	//Set Slides on sides
	s6.setSlides = function() {
		s6.slides.each(function(){
			$(this)
			.removeClass('s6-slide-top')
			.removeClass('s6-slide-left')
			.removeClass('s6-slide-right')
			.removeClass('s6-slide-bottom')
			.removeClass('s6-slide-front')
			.removeClass('s6-slide-back')
		})
		//Set Slides Side-Classes
		if (!s6.inf) {
			s6.slides.eq(0).addClass('s6-slide-front')
			s6.slides.eq(2).addClass('s6-slide-back')
			if (isH()) {
				s6.slides.eq(1).addClass('s6-slide-right')
				s6.slides.eq(3).addClass('s6-slide-left')
			}
			else {
				s6.slides.eq(1).addClass('s6-slide-bottom')
				s6.slides.eq(3).addClass('s6-slide-top')
			}
		}
		else {
			s6.slides.eq(0).addClass('s6-slide-front')
		}
		
		s6.slides.each(function(){
			if (s6.inf) return
			var slide = $(this)
			var _slide = slide[0]
			//var slide_ = slide.style
			if ( slide.hasClass('s6-slide-right') ) {
				setSide(_slide,'right');
			}
			if ( slide.hasClass('s6-slide-left') ) {
				setSide(_slide,'left');
			}
			if ( slide.hasClass('s6-slide-back') ) {
				setSide(_slide,'back');
			}
			if ( slide.hasClass('s6-slide-top') ) {
				setSide(_slide,'top');
			}
			if ( slide.hasClass('s6-slide-bottom')) {
				setSide(_slide,'bottom');
			}
		})
		//Dynamic Shadow
		if (s6.params.dynamicShadow) {
			if (s6.container.find('.s6-dynamic-shadow').length>0) {
				s6.container.find('.s6-dynamic-shadow').remove()
			}
			var scale = s6.params.dynamicShadowScale;
			var offset = s6.params.dynamicShadowOffset
			if (isH())
				s6.wrapper.append('<div class="s6-dynamic-shadow"></div>')
			else 
				s6.container.append('<div class="s6-dynamic-shadow"></div>')
			s6.shadow = s6.container.find('.s6-dynamic-shadow')
			
			var shadowTransform = isH() 
				? ( 'scale3d('+scale+', 1, '+scale+') translate3d(0px, '+(s6.height-s6.width/2 + offset)+'px, '+(-s6.width/2 / scale)+'px) rotateX(-90deg)' ) 
				: ( 'scale3d('+scale+', 1, '+scale+') translate3d(0px, '+(s6.height/2 + offset)+'px, '+(-s6.height/2/scale)+'px) rotateX(-90deg)' )
			var ss = s6.shadow[0].style
			ss.webkitTransform = ss.MsTransform = ss.MozTransform = ss.OTransform = ss.transform = shadowTransform
			ss.width = s6.width+'px';
			ss.height = (isH() ? s6.width : s6.height) + 'px'
		}
		//Add Sub-Faces
		if (isH()) {
			if (!s6.params.createBackFaces) return
			s6.wrapper.find('.s6-slide-top, .s6-slide-bottom').remove()
			
			s6.wrapper.append('<div class="'+s6.params.slideClass+' s6-slide-top"></div><div class="'+s6.params.slideClass+' s6-slide-bottom"></div>')
			//Top Slide
			s6.wrapper.find('.s6-slide-top').css({
				width: s6.width,
				height: s6.width,
				background: params.faces.top
			})
			var ts = s6.wrapper.find('.s6-slide-top')[0]
			setSide(ts,'top');
			
			//Bottom Slide
			s6.wrapper.find('.s6-slide-bottom').css({
				width: s6.width,
				height: s6.width,
				background: params.faces.bottom
			})
			var bs = s6.wrapper.find('.s6-slide-bottom')[0]
			setSide(bs,'bottom');
			
		}
		else {
			if (!s6.params.createBackFaces) return
			s6.wrapper.find('.s6-slide-left, .s6-slide-right').remove()
			
			s6.wrapper.append('<div class="'+s6.params.slideClass+' s6-slide-left"></div><div class="'+s6.params.slideClass+' s6-slide-right"></div>')
			
			//Left Slide
			s6.wrapper.find('.s6-slide-left').css({
				width: s6.height,
				height: s6.height,
				background: params.faces.left
			})
			var ls = s6.wrapper.find('.s6-slide-left')[0]
			setSide(ls,'left');
			
			//Right Slide
			s6.wrapper.find('.s6-slide-right').css({
				width: s6.height,
				height: s6.height,
				background: params.faces.right
			})
			var rs = s6.wrapper.find('.s6-slide-right')[0]
			setSide(rs,'right');
			
		}
		
	}
	s6.setSlides()
	
	//Set Visibility after all slides are transformed
	s6.wrapper.find('.'+s6.params.slideClass).css({visibility:'visible'})
	
	//Set Slides for infinite mode
	function setInfSlides() {
		var _rotate = isH() ? getRotate().y : getRotate().x
		var rotate = Math.abs(_rotate)
		rotate = rotate - Math.floor(rotate/360)*360
		
		var nextIndex = s6.activeSlide+1 >= s6.numOfSlides ? 0 : s6.activeSlide+1
		var prevIndex = s6.activeSlide-1 < 0 ? s6.numOfSlides-1 : s6.activeSlide-1

		var nextSlide = s6.slides.eq(nextIndex)
		var _nextSlide = nextSlide[0]
		var prevSlide = s6.slides.eq(prevIndex)
		var _prevSlide = prevSlide[0]
		//Hide Slides
		s6.slides.each(function(){
			var index = $(this).index()
			if (index!=nextIndex&&index!=prevIndex&&index!=s6.activeSlide) {
				$(this).hide()
			}
		})
		if (isH()) {
			if (rotate==0) {
				setSide(_nextSlide,'right');
				setSide(_prevSlide,'left');
			}
			if (rotate==90 || ( rotate==270&&_rotate>0 ) ) {
				setSide(_nextSlide,'back');
				setSide(_prevSlide,'front');
			}
			if (rotate===180) {
				setSide(_nextSlide,'left');
				setSide(_prevSlide,'right');
			}
			if ((rotate===270&&_rotate<0) || (rotate==90&&_rotate>0)) {
				setSide(_nextSlide,'front');
				setSide(_prevSlide,'back');
			}
		}
		else {
			if (rotate==0) {
				setSide(_nextSlide,'bottom');
				setSide(_prevSlide,'top');
			}
			if (rotate==90 || ( rotate==270&&_rotate<0 ) ) {
				setSide(_nextSlide,'back');
				setSide(_prevSlide,'front');
			}
			if (rotate===180) {
				setSide(_nextSlide,'top');
				setSide(_prevSlide,'bottom');
			}
			if ((rotate===270&&_rotate>0) || (rotate==90&&_rotate<0)) {
				setSide(_nextSlide,'front');
				setSide(_prevSlide,'back');
			}
		}
		nextSlide.show()
		prevSlide.show()
	}
	//Resize Fix
	$(window).resize(function(e) {
        s6.init()
		s6.setSlides()
    });
	window.addEventListener('resize', resizeS6Fix, false);
	function resizeS6Fix() {
		s6.init()
		s6.setSlides()
		swipeReset(true)
	}
	//Add 'active' class to the front slide on start
	s6.wrapper.find('.s6-slide-front').addClass('s6-slide-active')
	
	//Pagination
	if (s6.params.pagination != false ) {
		if (s6.params.createPagination) {
			var paginationHTML = ""
			for (var i=1; i <= s6.slides.length; i ++ ) {
				paginationHTML+='<span class="'+s6.params.paginationClass+'"></span>';
			}
			$(s6.params.pagination).html(paginationHTML)
		}
		$(s6.params.pagination).children().eq(0).addClass( s6.params.paginationActiveClass )
	
	}
	
	//Detect Touch Support
	s6.isSupportTouch = function()  {
		return "ontouchstart" in window
	}
	
	//Define Touch Events
	var touchEvents = {
		touchStart : s6.isSupportTouch() || !s6.params.simulateTouch  ? 'touchstart' : 'mousedown',
		touchMove : s6.isSupportTouch() || !s6.params.simulateTouch ? 'touchmove' : 'mousemove',
		touchEnd : s6.isSupportTouch() || !s6.params.simulateTouch ? 'touchend' : 'mouseup'
	};
	
	//Autoplay
	var autoPlay
	s6.startAutoPlay = function() {
		if (s6.params.autoPlay) {
			autoPlay = setInterval(function(){ s6.swipeNext() }, s6.params.autoPlay)
		}
	}
	s6.stopAutoPlay = function() {
		if (autoPlay)
			clearInterval(autoPlay)
	}
	if (s6.params.autoPlay) {
		s6.startAutoPlay()
	}
	
	//Event Listeners
	s6.container[0].addEventListener(touchEvents.touchStart, onTouchStart, false);
	var listenEl = s6.isSupportTouch() ? s6.container[0] : document
	listenEl.addEventListener(touchEvents.touchMove, onTouchMove, false);
	listenEl.addEventListener(touchEvents.touchEnd, onTouchEnd, false);
	
	//Destroy All S6 Events
	s6.destroy = function() {
		s6.container[0].removeEventListener(touchEvents.touchStart, onTouchStart, false);
		listenEl.removeEventListener(touchEvents.touchMove, onTouchMove, false)
		listenEl.removeEventListener(touchEvents.touchEnd, onTouchEnd, false)
		window.removeEventListener('resize', resizeS6Fix, false);
	}
	
	//Set Wrapper To 0-rotates
	setRotate({x:0, y:0, z:0}, true)
	
	//Event Handlers
	function onTouchStart(event) {
		if (s6.isTouched) return false
		s6.isTouched = true
		//Re-set slides in infinite mode
		if (s6.inf) {
			setInfSlides()
		}
		if (s6.params.onlyExternal) return
		if ( !s6.isSupportTouch() || event.targetTouches.length == 1 ) {
			
			if (!s6.isSupportTouch() && s6.params.simulateTouch) {
				event.preventDefault()
			}	
			s6.touches.startX = s6.isSupportTouch() ? event.targetTouches[0].pageX : event.pageX;
			s6.touches.startY = s6.isSupportTouch() ? event.targetTouches[0].pageY : event.pageY;
			
			//Set Transition Time to 0
			setTransition(0)
			
			// Get Start Rotate Angles
			
			s6.rotates.startX = s6.rotates.currentX = getRotate().x
			s6.rotates.startY = s6.rotates.currentY = getRotate().y
			
			//TouchStartTime
			var tst = new Date()
			s6.times.start = tst.getTime()
			
			//Unset Scrolling
			isScrolling = undefined;
			
			//Callback
			if (params.onTouchStart) {
				params.onTouchStart(s6)	
			}
		}
	}
	function onTouchMove(event) {
		if (!s6.isTouched) return
		if (s6.params.onlyExternal) return
		//check for scrolling
		if (s6.isSupportTouch()) {
		    if ( typeof isScrolling == 'undefined' && isH()) {
		      isScrolling = !!( isScrolling || Math.abs(event.targetTouches[0].pageY - s6.touches.startY) > Math.abs( event.targetTouches[0].pageX - s6.touches.startX ) )
		    }
		    if ( typeof isScrolling == 'undefined' && !isH()) {
		      isScrolling = !!( isScrolling || Math.abs(event.targetTouches[0].pageY - s6.touches.startY) < Math.abs( event.targetTouches[0].pageX - s6.touches.startX ) )
		    }
			if (isScrolling ) return
		}
		
		//Stop AutoPlay
		if (s6.params.autoPlay) {
			s6.stopAutoPlay()
		}
		
		if (!s6.isSupportTouch() || event.touches.length == 1) {
			event.preventDefault()
			
			var touch = s6.isSupportTouch() ? event.targetTouches[0] : event;
			
			s6.touches.currentX = s6.isSupportTouch() ? event.targetTouches[0].pageX : event.pageX;
			s6.touches.currentY = s6.isSupportTouch() ? event.targetTouches[0].pageY : event.pageY;

			s6.touches.diffX = s6.touches.currentX - s6.touches.startX;
			s6.touches.diffY = s6.touches.currentY - s6.touches.startY;
			
			var rotateX = ( !isH() ? s6.touches.diffY * (-90/s6.height) : 0 ) + s6.rotates.startX*1
			var rotateY = ( isH() ? s6.touches.diffX*90/s6.width : 0 ) + s6.rotates.startY*1
			
			if (s6.inf) {
				if (isH()) { 
					if ( Math.abs(rotateY - s6.rotates.startY) >=90 ) return
				}
				else {
					if ( Math.abs(rotateX - s6.rotates.startX) >=90 ) return
				}
			}
			s6.rotates.currentX= rotateX
			s6.rotates.currentY= rotateY
			
			if (params.followFinger) {
				setRotate({x: s6.rotates.currentX, y:s6.rotates.currentY}, false)
			}
			
			if (params.onTouchMove) {
				params.onTouchMove(s6)	
			}
			
		}
	}
	function onTouchEnd(event) {	
		if (!s6.isTouched) return
		s6.isTouched = false
		if (s6.params.onlyExternal) return	
		//Update Rotate Attributes
		setRotate({x: s6.rotates.currentX, y: s6.rotates.currentY}, true)
		setTransition(s6.params.speed)
		//Callback
		
		if (!s6.rotates.currentY) {
			s6.rotates.currentY = s6.rotates.startY	
		}
		if (!s6.rotates.currentX) {
			s6.rotates.currentX = s6.rotates.startX	
		}
		s6.rotates.diffY = s6.rotates.currentY - s6.rotates.startY;
		s6.rotates.diffX = s6.rotates.currentX - s6.rotates.startX;
		
		// TouchEndTime
		var tet = new Date()
		s6.times.end = tet.getTime();
		
		//Free Mode
		if (s6.params.freeMode&&!s6.inf) {			
			if ( s6.times.end - s6.times.start < 300 && s6.params.freeModeFluid == true ) {
				if ( isH() ) {
					if ( Math.abs(s6.rotates.diffY) !== 0 ){
						setRotate({y: s6.rotates.currentY*1+s6.rotates.diffY*1 }, true)
						setTransition( (s6.times.end - s6.times.start)*3 )
					}
				}
				else {
					if ( Math.abs(s6.rotates.diffX) !== 0 ){
						setRotate({x: s6.rotates.currentX*1+s6.rotates.diffX*1 }, true)
						setTransition( (s6.times.end - s6.times.start)*3 )
					}	
				}
				
			}
			
			if (params.onTouchEnd) {
				params.onTouchEnd(s6)	
			}
			
			return
		}
		//Rotate Diff
		if ( isH() ) s6.rotates.diff = s6.rotates.diffY
		else s6.rotates.diff = s6.rotates.diffX
		
		//Direction
		if ( isH() )
			s6.direction = s6.rotates.diffY < 0 ? "toRight" : "toLeft"
			
		else
			s6.direction = s6.rotates.diffX > 0 ? "toRight" : "toLeft"
		
		//Short Touches
		if (s6.direction=="toRight" && ( s6.times.end - s6.times.start <= 500 ) ) {
			if (Math.abs(s6.rotates.diff)<10) swipeReset()
			else s6.swipeNext('internal');
		}
		
		if (s6.direction=="toLeft" && ( s6.times.end - s6.times.start <= 500 ) ) {
			if (Math.abs(s6.rotates.diff)<10) swipeReset()
			else s6.swipePrev('internal');
		}
		//Long Touches
		if (s6.direction=="toRight" && ( s6.times.end - s6.times.start > 500 ) ) {
			if (Math.abs(s6.rotates.diff) >= 45) {
				s6.swipeNext('internal');
			}
			else {
				swipeReset()
			}
		}
		if (s6.direction=="toLeft" && ( s6.times.end - s6.times.start > 500 ) ) {
			if (Math.abs(s6.rotates.diff) >= 45) {
				s6.swipePrev('internal');
			}
			else {
				swipeReset()
			}
		}
		
		if (params.onTouchEnd) {
			params.onTouchEnd(s6)	
		}
		
	}
	
	s6.swipeNext = function(internal) {
		//Re-set slides in infinite mode
		if (s6.inf&&internal!='internal') {
			setInfSlides()
		}
		//
		if ( isH() ) {
			var newRotate = Math.ceil(getRotate().y/90) * 90 - 90
			setRotate({y:newRotate}, true, true, 'next')
			s6.rotates.currentY = newRotate
		}
		else {
			var fixAngle = Math.ceil(getRotate().x/90) == getRotate().x/90 ? 90 : 0
			var newRotate = Math.ceil(getRotate().x/90) * 90 + fixAngle
			setRotate({x:newRotate}, true, true, 'next')
			s6.rotates.currentX = newRotate
		}
		activateSlide()
		setTransition(s6.params.speed)
		//Callbacks
		if (params.onSlideChangeStart)
			params.onSlideChangeStart(s6)
		if (params.onSlideChangeEnd)
			s6TransitionEnd(params.onSlideChangeEnd)
 	}
	s6.swipePrev = function(internal) {
		//Re-set slides in infinite mode
		if (s6.inf&&internal!='internal') {
			setInfSlides()
		}
		if ( isH() ) {
			var newRotate = Math.floor(getRotate().y/90) * 90 + 90
			setRotate({y:newRotate}, true, true, 'prev')
			s6.rotates.currentY = newRotate
		}
		else {
			var fixAngle = Math.ceil(getRotate().x/90) == getRotate().x/90 ? -90 : 0
			var newRotate = Math.floor(getRotate().x/90) * 90 + fixAngle
			setRotate({x:newRotate}, true, true, 'prev')
			s6.rotates.currentX = newRotate
		}
		activateSlide()
		setTransition(s6.params.speed)
		//Callbacks
		if (params.onSlideChangeStart)
			params.onSlideChangeStart(s6)
		if (params.onSlideChangeEnd)
			s6TransitionEnd(params.onSlideChangeEnd)	
	}
	function swipeReset(fast) {
		if ( isH() ) {
			var newRotate = Math.round( getRotate().y /90) * 90
			setRotate({y:newRotate}, true, true)
			s6.rotates.currentY = newRotate
		}
		else {
			var newRotate = Math.round(getRotate().x/90) * 90 
			setRotate({x:newRotate}, true, true)
			s6.rotates.currentX = newRotate
		}
		if (fast) {
			setTransition(0)
		}
		if(params.onSlideReset) 
			params.onSlideReset(s6)
	}
	//Transition End Callback
	function s6TransitionEnd(callback) {
		var el = s6.wrapper[0]
		var events = ['webkitTransitionEnd','transitionend', 'oTransitionEnd', 'MSTransitionEnd'];
		if (callback) {
			function fireCallBack() {
				callback(s6)
				for (var i=0; i<events.length; i++) {
					el.removeEventListener(events[i], fireCallBack, false)
				}
			}
			for (var i=0; i<events.length; i++) {
				el.addEventListener(events[i], fireCallBack, false)
			}
		}
	}
	function activateSlide(direction) {
		
		if (s6.inf) {
			var newSlide = s6.wrapper.slides.eq(s6.activeSlide)
		}
		else {
			var angle = isH() ? getRotate().y : getRotate().x
			var index = angle - Math.floor(angle/360)*360
			index = 4-index/90;
			index = index == 4 ? 0 : index;
			
			var newSlide;
			if (index==0) newSlide= s6.wrapper.find('.s6-slide-front')
			if (index==1) isH() ? newSlide= s6.wrapper.find('.s6-slide-right') : newSlide= s6.wrapper.find('.s6-slide-top')
			if (index==2) newSlide= s6.wrapper.find('.s6-slide-back')
			if (index==3) isH() ? newSlide= s6.wrapper.find('.s6-slide-left') : newSlide= s6.wrapper.find('.s6-slide-bottom')
		}
		s6.wrapper.find(".s6-slide-active").removeClass('s6-slide-active')
		newSlide.addClass('s6-slide-active')
	}
	
	function setRotate(a, setRotateAttributes, calcSlides, direction) {
		if (!calcSlides) calcSlides = false
		if (!a) a = {};
		a.x = a.x || 0;
		a.y = a.y || 0;
		a.z = a.z || 0;
		
		var translateY
		if ( isH() ) {
			var translateX =   s6.width * Math.sin( a.y * 2 * Math.PI/360 ) / 2
			var translateY =   0
			var translateZ =   s6.width * Math.cos( a.y * 2 * Math.PI/360 ) / 2 - s6.width / 2
			translateX = Math.round(translateX)
			
		}
		if ( isH() ) {
			var translateX =   s6.width * Math.sin( a.y * 2 * Math.PI/360 ) / 2
			var translateY =   0
			var translateZ =   s6.width * Math.cos( a.y * 2 * Math.PI/360 ) / 2 - s6.width / 2
			translateX = Math.round(translateX)
			
		}
		else {
			var translateX =   0
			var translateY =   -s6.height * Math.sin( a.x * 2 * Math.PI/360 ) / 2
			var translateZ =   s6.height *  Math.cos( a.x * 2 * Math.PI/360 ) / 2 - s6.height / 2
			translateY = Math.round(translateY)
		}
		
		if (!translateY) translateY = 0
		var ws = s6.wrapper[0].style
		ws.webkitTransform = ws.MsTransform = ws.MozTransform = ws.OTransform = ws.transform = 'translate3d('+ translateX +'px,  '+ translateY +'px,'+ translateZ +'px) rotateX('+ a.x +'deg) rotateY('+ a.y +'deg)'
		
		//Handle DynShadow
		if (!isH()&&s6.params.dynamicShadow) {
			var angle = Math.abs(a.x)
			angle = angle - Math.floor(angle/90)*90
			
			var multiplier = 1.5 - (Math.sin( angle*2*Math.PI/360 )/2 + Math.cos( angle*2*Math.PI/360 )/2)
			var scale1 = params.dynamicShadowScale,
			    scale2 = s6.params.dynamicShadowScale/multiplier,
				offset = s6.params.dynamicShadowOffset;
				
			var ss = s6.shadow[0].style
			ss.webkitTransform = ss.MsTransform = ss.MozTransform = ss.OTransform = ss.transform = 'scale3d('+scale1+', 1, '+scale2+') translate3d(0px, '+(s6.height/2 + offset)+'px, '+(-s6.height/2/scale2)+'px) rotateX(-90deg)'
			
		}
		if (setRotateAttributes) {
			s6.wrapper.attr({
				'data-s6rotatex' : a.x,
				'data-s6rotatey' : a.y,
				'data-s6rotatez' : a.z	
			})
		}
		if (s6.params.freeMode || calcSlides) {
			s6.activeSlide = calcCurrentSlide({
				rotateX : a.x,
				rotateY : a.y
			},direction)
			if (s6.params.pagination) {
				calcPagination({rotateX:a.x, rotateY:a.y})
			}
		}
	}
	
	function getRotate() {
		return {
			x : s6.wrapper.attr('data-s6rotatex'),
			y : s6.wrapper.attr('data-s6rotatey'),
			z : s6.wrapper.attr('data-s6rotatez')	
		}
	}
	function setTransition(time) {
		var ws = s6.wrapper[0].style
		ws.webkitTransitionDuration = ws.MsTransitionDuration = ws.MozTransitionDuration = ws.OTransitionDuration = ws.transitionDuration = 	time/1000+'s'
		if (!isH()&&s6.params.dynamicShadow) {
			var ss = s6.shadow[0].style
			ss.webkitTransitionDuration = ss.MsTransitionDuration = ss.MozTransitionDuration = ss.OTransitionDuration = ss.transitionDuration = 	time/1000+'s'
		}
		
	}
	function calcPagination(a) {
		var activeSwitch = $(s6.params.pagination).find( '.'+s6.params.paginationActiveClass ).index()
		if (!s6.inf) {
			var curSlide = s6.activeSlide
		}
		else {
			var curSlide = s6.activeSlide
		}
		if (activeSwitch != curSlide) {
			$(s6.params.pagination).find('.'+s6.params.paginationActiveClass).removeClass( s6.params.paginationActiveClass );
			$(s6.params.pagination).children().eq(curSlide).addClass( s6.params.paginationActiveClass )
		}
	}
	function calcCurrentSlide(a,direction) {
		if (s6.inf) {
			if (!direction) return s6.activeSlide
			var nextIndex = s6.activeSlide+1 >= s6.numOfSlides ? 0 : s6.activeSlide+1
			var prevIndex = s6.activeSlide-1 < 0 ? s6.numOfSlides-1 : s6.activeSlide-1
			var newIndex = direction=='next' ? nextIndex : prevIndex
			s6.activeSlide = newIndex
			return newIndex
		}
		var curRotate = s6.params.mode == 'horizontal' ? a.rotateY : -a.rotateX
		if (curRotate > 0) {
			var curCircles = Math.floor(curRotate/360) 
			var curAngle = curRotate - curCircles*360 
			var curSlide = 4 - (Math.round(curAngle/90))  
		}
		else {
			var curCircles =  Math.floor(-curRotate/360)
			var curAngle = curRotate + curCircles*360
			var curSlide = Math.round(-curAngle/90) 
		}
		if (curSlide==4) curSlide = 0
		
		return curSlide
	}
	
	//Return Object
	return s6;
}
})(window.jQuery||window.Zepto);




