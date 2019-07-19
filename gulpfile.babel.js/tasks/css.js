import {src, dest} from 'gulp';
import plumber from 'gulp-plumber';
import stylint from 'gulp-stylint';
import stylus from 'gulp-stylus';
import nib from 'nib';
import equalizr from 'mantis-equalizr';
import querist from 'mantis-querist';
import grid from 'mantis-grid';
import layers from 'mantis-layers';
import {prod} from '../index';
import {css} from '../paths';
import {stream} from './serve';

export default function cssTask (done) {
	if (!prod) {
		src(css.watch)
			.pipe(stylint())
			.pipe(stylint.reporter());
	}

	src(css.src)
		.pipe(plumber())
		.pipe(stylus({
			use: [
				nib(),
				equalizr(),
				querist(),
				grid(),
				layers()
			],
			compress: prod,
			linenos: !prod,
			errors: true
		}))
		.pipe(dest(css.dest))
		.pipe(stream());

	done();
};
