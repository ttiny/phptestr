function SourceView () {
	View.Panel.call( this );
	this.addView( $T( 'Tmpl.SourceView' ) );
	this._code = this.findView( '#code' ).setState( 'active', false );
	this._title = this.findView( '#title' );
}

SourceView.extend( View.Panel, {
	open: function () {
		this._open = new HttpRequest( '/open?' + HttpRequest.urlEncode( { file: this._file } ) ).send();
	},

	load: function ( file ) {
		if ( this._load || this._file == file ) {
			return false;
		}
		var that = this;
		this._title.setText( file );
		this._file = file;
		this._lines = false;
		that._loaded = false;
		this._load = new HttpRequest( '/read?' + HttpRequest.urlEncode( { file: this._file } ), function ( res ) {
			that._load = null;
			if ( res.Success ) {
				that._loaded = true;
				var code = hljs.highlight( 'php', res.Data ).value.split( '\n' ).join( '</li><li>' );
				if ( code.length ) {
					code = '<ol><li>' + code + '</li></ol>';
				}
				that._code.setHtml( code );
				that._code.setState( 'active' );
				if ( that._highlight ) {
					that.highlight( that._highlight );
					that._highlight = null;
				}
			}
		} ).send();
	},

	highlight: function ( lines ) {
		if ( !this._loaded ) {
			this._highlight = lines;
		}
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
				li.classList.add( 'highlight' );
				if ( lines.length == 1 ) {
					li.scrollIntoView();
				}
			}
		}
	}
} );