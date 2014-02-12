function OpenSourceButton ( button ) {
	button.on( 'click', function ( e ) {
		if ( button.hasState( 'disabled' ) ) {
			return;
		}
		Panels.getView().sourceview.open();
	} );
}

function SourceView () {
	View.Panel.call( this );
	this.setClass( 'SourceView' );
	this.setLayout( 'VerticalFlex' );
	this.addView( $T( 'Tmpl.SourceView' ) );
	this._code = this.findView( '#code' ).setState( 'active', false );
	this._title = this.findView( '#title' );
}

SourceView.RE_NOHL = /^[ \t\(\);\{\}]*$/;

SourceView.extend( View.Panel, {
	open: function () {
		this._open = new HttpRequest( '/open?' + HttpRequest.urlEncode( { file: this._file } ) ).send();
	},

	load: function ( file, lines, scrollintoview, fileRel ) {
		if ( this._load ) {
			return false;
		}
		if ( this._file == file ) {
			this._highlight( lines, scrollintoview );
			return true;
		}
		var that = this;
		this._title.setText( fileRel || file );
		this._file = file;
		this._lines = false;
		that._loaded = false;
		this._load = new HttpRequest( '/read?' + HttpRequest.urlEncode( { file: this._file } ), function ( res ) {
			that._load = null;
			if ( res.Success ) {
				that._loaded = true;
				var code = hljs.highlight( 'php', res.Data ).value.split( '\n' ).join( '</li><li>' );
				code = hljs.fixMarkup( code, '  ' );
				if ( code.length ) {
					code = '<ol><li>' + code + '</li></ol>';
				}
				that._code.setHtml( code );
				that._code.setState( 'active' );
				that._highlight( lines, scrollintoview );
			}
		} ).send();
	},

	_highlight: function ( lines, scrollintoview ) {
		if ( !(lines instanceof Array) ) {
			lines = [ lines ];
		}
		var el = this._code.getElement();
		var hls = el.getElementsByClassName( 'highlight' );
		for ( var i = hls.length - 1; i >= 0; --i ) {
			hls[i].classList.remove( 'highlight' );
		}
		var lis = el.getElementsByTagName( 'li' );
		for ( var i = lines.length - 1; i >= 0; --i ) {
			var li = lis[lines[i]-1];
			if ( li ) {
				// xdebug reports coverage for } some times
				if ( scrollintoview || !li.textContent.match( SourceView.RE_NOHL ) ) {
					li.classList.add( 'highlight' );
				}
				if ( scrollintoview ) {
					var visibleLines = el.offsetHeight / li.offsetHeight;
					var lineToScroll = parseInt( Math.max( lines[i] - visibleLines/2 - 1, 0 ) );
					lis[lineToScroll].scrollIntoView();
				}
			}
		}
	}
} );