import express from 'express';
import { create } from 'express-handlebars';

const app = express();

const hbs = create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo() { return 'FOO!'; },
        bar() { return 'BAR!'; }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res, next) => {
    res.render('home', {
        showTitle: true,

        // Override `foo` helper only for this rendering.
        helpers: {
            foo() { return 'foo.'; }
        }
    });
});

app.listen(3000);