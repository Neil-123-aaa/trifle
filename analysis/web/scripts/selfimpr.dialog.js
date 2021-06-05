/**
 * @author: selfimpr
 * @blog: http://blog.csdn.net/lgg201
 * @email: lgg860911@yahoo.com.cn
 * ʹ�÷���:
 * var dialog = new Dialog({
 * 	target: '#dialog', 
 * 	width: 800, 
 * 	height: 600, 
 * 	modal: false, 
 * 	title: '����', 
 * 	draggabled: false
 * });
 * ��������
 * target: Ҫ��dialog��װ��Ŀ��, ������ѡ�������׼DOMԪ��
 * width: dialog���, ��Ҫ���ù�С, û������С��ȼ��.
 * height: dialog�߶�. ͬ����Ҫ���ù�С
 * modal: �Ƿ���ģ̬����
 * title: ���ڵı���
 * draggabled: �����Ƿ����ק
 * ����:
 * show(): ��ʾ�ô���
 * destroy(): �رմ���. ����ֻ�Ǽ���������, ��û�������������ٹ���.
 */
var Dialog = function(options) {
	this.target = $(options.target);
	this.width = options.width || 800;
	this.height = options.height || 600;
	this.modal = options.modal || false;
	this.title = options.title || $(options.target).selector;
	this.draggabled = options.draggabled || false;
	this._initialized = false;
	this._element = null;
	this._showing = false;
	this._init = (function() {
		var self = this;
		if(!this._initialized) {
			this.target.hide();
			this._element = $('<div>').addClass('seasy-dialog').width(this.width).height(this.height)
				.css('position', 'absolute')
				.append( //���header
					$('<div>').addClass('seasy-dialog-header').width(this.width).height(27)
						.append($('<div>').addClass('seasy-dialog-header-left').width(17).height(27))
						.append($('<div>').addClass('seasy-dialog-header-center').width(this.width - 34).height(27))
						.append($('<div>').addClass('seasy-dialog-header-right').width(17).height(27))
				).append( //���body
					$('<div>').addClass('seasy-dialog-body')
						.append($('<div>').addClass('seasy-dialog-body-left').width(17).height(this.height - 34))
						.append($('<div>').addClass('seasy-dialog-body-center').width(this.width - 34).height(this.height - 34)
							.append($('<div>').addClass('seasy-dialog-body-title').width(this.width - 34).height(25)
								.append($('<div>').addClass('seasy-dialog-body-title-content').height(25).text(this.title))
								.append($('<div>').addClass('seasy-dialog-body-title-right').width(7).height(25))
								.append($('<div>').addClass('seasy-dialog-body-title-button').width(25).height(25).click(function(event) {
									self.destroy();
								}))
							)
							.append($('<div>').addClass('seasy-dialog-body-body').width(this.width - 34).height(this.height - 79))
						)
						.append($('<div>').addClass('seasy-dialog-body-right').width(17).height(this.height - 34))
				).append( //���foot
					$('<div>').addClass('seasy-dialog-foot').width(this.width).height(27)
						.append($('<div>').addClass('seasy-dialog-foot-left').width(17).height(27))
						.append($('<div>').addClass('seasy-dialog-foot-center').width(this.width - 34).height(27))
						.append($('<div>').addClass('seasy-dialog-foot-right').width(17).height(27))
				);
			$(window).resize(function(event) {
				self._location();
			});
			if(this.draggabled) {
				this._element.draggable({
					containment: 'window'
				});
			}
			this._location();
			this._initialized = !this._initialized;
		}
	});
	this._location = (function() {
		this._element
			.css('left', ($('body').offset().left + $(window).width() - this.width) / 2)
			.css('top', ($('body').offset().top + $(window).height() - this.height) / 2);
	});
	this.show = (function() {
		if(!this._showing) {
			$('body').prepend($('<div>').addClass('seasy-modal-layer')).css('overflow', 'hidden');
			this.target.after(this._element);
			this._element.children('.seasy-dialog-body').find('.seasy-dialog-body-body').append(this.target);
			this.target.show();
			this._element.css('z-index', 1002).show();
			this._showing = !this._showing;
		}
	});
	this.destroy = (function() {
		if(this._showing) {
			$('.seasy-modal-layer').remove();
			$('body').css('overflow', 'auto');
			this._element.after(this.target);
			this._element.hide();
			this.target.hide();
			this._showing = !this._showing;
		}
	});
	this._init();
}