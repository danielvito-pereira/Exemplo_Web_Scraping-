const scrapeIt = require("scrape-it");

scrapeIt("https://www.amazon.com.br/s?k=iPhone&i=electronics&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_2", {
    celulares: {
        listItem:"[div.sg-col-4-of-12]",

        valor: {
            url:{
                selector: 'span.a-price-whole',
                attr:'href'
            }
        }
    }
})
.then(page => {
    urls =page.celulares.map( celulares => 'https://www.amazon.com.br/' + celulares.url)//Page é a pagina que contem a url. estou mapeando os Celulare que é o selector para cada link 
    Promise.all(url.slice(0,2).map(url => getPage(url)))//chamo o getPage para executar o metodo, estou usando o slice para capturar apenas os primeiros 20 
    .then(result => {
        console.log(result);
    })

})
.catch( err => console.log(err));







var getPage = url => {
    console.log('Starting ${url}');
    return scrapeIt(url,{//passando a url
        title: "span.productTitle.a"
        , valor: "span.priceblock_ourprice.a"
            , attr: "src"
        }).then(console.log('Fim ${url}')).catch(err => console.log(err));   
}
//Promise so permite o print apos todos serem executados

Promise.all([getPage('https://www.amazon.com.br/iPhone-Pro-Max-Tela-Polegadas/')])
.then(data => console.log(valor))//passando a url do site 
