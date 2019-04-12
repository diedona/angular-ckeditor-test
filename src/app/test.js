/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals window */

/**
 * @module adapter-base64/uploadadapter
 */


/**
 * @extends module:core/plugin~Plugin
 */
// export default class Base64UploadAdapter {
// 	/**
// 	 * @inheritDoc
// 	 */
// 	static get requires() {
// 		return [ FileRepository ];
// 	}

// 	/**
// 	 * @inheritDoc
// 	 */
// 	static get pluginName() {
// 		return 'Base64UploadAdapter';
// 	}

// 	/**
// 	 * @inheritDoc
// 	 */
// 	init() {
// 		// Register Base64UploadAdapter
// 		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => new UploadAdapter( loader, this.editor.t );
// 	}
// }

export default function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new UploadAdapter( loader, editor.t );
    };
}

/**
 * Upload adapter for Base64.
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
class UploadAdapter {
	/**
	 * Creates a new adapter instance.
	 *
	 * @param {module:upload/filerepository~FileLoader} loader
	 * @param {module:utils/locale~Locale#t} t
	 */
	constructor( loader, t ) {
		/**
		 * FileLoader instance to use during the upload.
		 *
		 * @member {module:upload/filerepository~FileLoader} #loader
		 */
		this.loader = loader;

		/**
		 * Locale translation method.
		 *
		 * @member {module:utils/locale~Locale#t} #t
		 */
		this.t = t;
	}

	/**
	 * Starts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#upload
	 * @returns {Promise}
	 */
	upload() {
		return new Promise( ( resolve, reject ) => {
			const reader = this.reader = new FileReader();

			reader.onload = function() {
				resolve( { default: reader.result } );
			};

			reader.onerror = function( error ) {
				reject( error );
			};

			reader.onabort = function() {
				reject();
			};

			//console.log(this.loader.file);
			this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
				reader.readAsDataURL(file);
                // this._initRequest();
                // this._initListeners( resolve, reject, file );
                // this._sendRequest( file );
            } ) );

			//reader.readAsDataURL( this.loader.file );
		} );
	}

	/**
	 * Aborts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#abort
	 * @returns {Promise}
	 */
	abort() {
		if ( this.reader ) {
			this.reader.abort();
		}
	}
}