// установить нод дж с
// установить глобально галп командой ниже
// npm i gulp -g
// создаем зависимость с package.json
// npm i gulp --save-dev
// появляеться папка node_modules со всеми зависимостями
// туда будут сваливаться все пакеты галпа
// теперь создаем файл gulpfile.js - этот файд
// и папки app или src (лучше срц) - в ней исходники
// папка dist - конечный продукт
var gulp = require('gulp'), // инициализация самого галпа - его подключение
	//  сасс и переделывает в цсс
	sass = require('gulp-sass'), // здесь такой же ник как и в коноль
	// обновляет браузер
	browserSync = require('browser-sync'),
	// соединяет файлы
	concat = require('gulp-concat'),
	// минифицирует файлы
	uglify = require('gulp-uglifyjs'),
	// переименовет файлы
	rename = require('gulp-rename'),
	// сжатие цсс
	cssnano = require('gulp-cssnano'),
	// удаляет файлы
	del = require('del'),
	// autoprefix
	autoprefixer = require('gulp-autoprefixer');

// создает функцию которую можно вызывать в консоли
// gulp mytask

// gulp.task('mytask', function(){
// 	// берем файл
// 	return gulp.src('source-files')
// 	// что-то делаем с ним
// 	.pipe(plugin())
// 	// выгружаем его
// 	.pipe(gulp.dest('folder'))
// });

gulp.task('sass', function(){
	// берем файл с которымм будет работать
	// можно применять различные шаблоны выборки
	// app/sass/main.sass - выбирает конкретный файл
	// app/sass/*.sass - выберет все файлы с разрешением сасс
	// app/sass/**/*.sass - выберет все файлы с разрешением сасс в папке сасс и во всех подпапках в ней
	// !app/sass/main.sass - данный файл исключиться из выборки
	// ['!app/sass/main.sass','app/sass/*.sass'] выберет все фалы кроме майн сасс
	// app/sass/*.+(scss|sass) - выберет все файлы сцсс и сасс
	// данный плагин не трогает файлы которые начинаються на _
	// к примеру _part.sass он подключаеться в майн сасс через импорт
	return gulp.src('app/sass/**/*.sass')
	// преобразовали данной командой
	.pipe(sass())
	// autoprefix
	.pipe(autoprefixer(['last 15 versions','> 1%', 'ie 8', 'ie 7'],{cascade:true}))
	// куда вывести файл, путь указывает только папки
	.pipe(gulp.dest('app/css'))
	// включаем слежку браузер синка
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});

gulp.task('css-libs',['sass'],function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css'))
});

gulp.task('BS',function(){
	browserSync({
		// устанавливает папку за которой будет следить
		server:{
			baseDir: 'app'
		},
		// отключает уведомления
		notify: false
	});
});
// функция котрая обновляет браузер при вотче
// npm install -g browser-sync - глобально установит данную функцию
// вот как нужно записывать
// npm i browser-sync --save-dev

gulp.task('clean',function(){
	return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'scripts'] ,function(){
var buildCss = gulp.src([
		'app/css/libs.min.css',
		'app/css/main.css',
	])
	.pipe(gulp.dest('dist/css'))
var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));
var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

});




// вотч встроенная функция ее не нежно подгружать в галп
// в квадратных скобках записуються таски которые должны сработать раньше самого вотча
gulp.task('watch', ['BS','css-libs', 'scripts'] , function(){
	// в вотче будет писаться путь к файлам за которыми будет идти слежка
	// и через запетую вводяться таски которые будут использоваться в вотче
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});







// bower
// его нужно устанавливать глобально
// npm i -g bower
// для него нужен гит
// создем файл .bowerrc
// в него нужно записать куда сохранять
// {
// 	"directory": "app/libs/"
// }