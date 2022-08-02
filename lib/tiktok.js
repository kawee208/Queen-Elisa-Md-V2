async function tiktokdlv3(url) {
    var _a;
    const resToken = await (0, got_1.default)('https://ssstik.io/id');
    const cookie = (_a = resToken.headers['set-cookie']) === null || _a === void 0 ? void 0 : _a.map(v => v.split(';')[0]).join('; ');
    const $$ = cheerio_1.default.load(resToken.body);
    const postUrl = $$('#_gcaptcha_pt').attr('hx-post');
    const html = await (0, got_1.default)('https://ssstik.io' + postUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            cookie: cookie || 'PHPSESSID=gb6hgnvvpkfg28ulo80l1u2qrl; __cflb=02DiuEcwseaiqqyPC5pE7Qjdp2jcR2J5YEMX3jgTCHMYX; _ga=GA1.2.1294804934.1647840559; _gid=GA1.2.1211588131.1647840559; __gads=ID=3ba3f6d3a5959cb0-224bbeea15d100da:T=1647840559:RT=1647840559:S=ALNI_MYtTuJ9ICRAeHGfemUzb2rwyaT6lw; ga_show=2; _gat_UA-3524196-6=1',
            'hx-current-url': 'https://ssstik.io/id',
            'hx-request': 'true',
            'hx-target': 'target',
            'hx-trigger': ' _gcaptcha_pt',
            origin: 'https://ssstik.io',
            referer: 'https://ssstik.io/id',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537'
        },
        form: {
            id: encodeURI(url),
            locale: 'id',
            gc: 0,
            tt: 0,
            ts: 0
        }
    }).text();
    const $ = cheerio_1.default.load(html);
    const $img = $('img.u-round');
    const $a = $('a.pure-button');
    let no_watermark = $a.eq(0).attr('href');
    if (!/https?:\/\//.test(no_watermark))
        no_watermark = `https://ssstik.io${no_watermark}`;
    return {
        author: {
            nickname: $img.attr('alt'),
            avatar: $img.attr('src')
        },
        description: $('p.maintext').text(),
        video: {
            no_watermark,
            no_watermark2: $a.eq(1).attr('href')
        },
        music: $a.eq(2).attr('href')
    };
}
exports.tiktokdlv3 = tiktokdlv3;
