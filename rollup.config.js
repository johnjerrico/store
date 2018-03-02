export default {
	input: './release/index.js',
	output: {
		file: './release/bundles/store.umd.js',
		format: 'umd',
		name: 'ngrx.store',
		globals: {
			'ng-metadata/core': 'ng.core',
			'@ngrx/core': 'ngrx.core',
			'rxjs/Observable': 'Rx',
			'rxjs/BehaviorSubject': 'Rx',
			'rxjs/Subscriber': 'Rx',
			'rxjs/scheduler/queue': 'Rx.Scheduler',
			'rxjs/operator/observeOn': 'Rx.Observable.prototype',
			'rxjs/operator/scan': 'Rx.Observable.prototype',
			'rxjs/operator/withLatestFrom': 'Rx.Observable'
		}
	}
}