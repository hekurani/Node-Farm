const file=require('fs');
const server=require('http');
const url=require('url');
const replaceTemplate=(product, temp) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
  }
const data=file.readFileSync("Node-farm//Data//NOSQL.json",'utf-8');
const card=file.readFileSync("Node-farm//templates//card.html",'utf-8');
const Product=file.readFileSync("Node-farm//templates//Product.html",'utf-8');
const overview=file.readFileSync("Node-farm//templates//overview.html",'utf-8');
const product_data=JSON.parse(data);
const cs=server.createServer((req,res)=>{
const { query, pathname }=url.parse(req.url,true);

if(pathname=='/overview'||pathname=='/'){
    res.writeHead(404,{
        'Content-type':'text/html',
        "my-own-header":'my-own-type'
    })
   const products= product_data.map(el=>replaceTemplate(el,card)).join('');
   const output=overview.replace(/{%PRODUCT_CARDS%}/,products);
res.end(output);
}
else if(pathname === '/product'){
    res.writeHead(200, {
        'Content-type': 'text/html'
      });
     const output= replaceTemplate(product_data[query.id],Product);
      res.end(output);
}
else{
    res.end("No page was FOUND");
}
});
cs.listen(8000,'127.0.0.1',()=>{
    console.log('listening to port number 8000');
});