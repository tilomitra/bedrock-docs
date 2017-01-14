var Metalsmith = require('metalsmith'),
    metallic = require('metalsmith-metallic'),
    drafts = require('metalsmith-drafts'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    assets = require('metalsmith-assets'),
    collections = require('metalsmith-collections'),
    autotoc = require('metalsmith-autotoc'),
    browserSync = require('browser-sync');

browserSync({
    server: 'build',
    files: ['src/*.md', 'layouts/*.html', 'assets/*.css'],
    middleware: function (req, res, next) {
        build(next);
    }
})

function build (callback) {

    Metalsmith(__dirname)
        .source('./src')
        .destination('./build')
        .clean(true)
        .use(drafts())
        .use(metallic())

        .use(markdown({
            smartypants: true,
            gfm: true,
            tables: true
        }))
        .use(autotoc({
            selector:"h2, h3, h4, h5, h6",
            headerIdPrefix: "subhead"
        }))

        .use(collections({
            "Get Started": {"sortBy": "date"},
            "Tutorials": {"sortBy": "date"},
            "User Authentication": {"sortBy": "date"}
        }))
        .use(layouts('handlebars'))
        .use(assets({
            source: './assets',
            destination: './assets'
        }))
        .build(function (err) {
            var message = err ? err : 'Build complete';
            console.log(message);
            callback();
        });

}

