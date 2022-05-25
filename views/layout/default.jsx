const React = require('react');

function Default(html) {
    console.log(html.title)
    return (
        <html>
            <head>
               <title>Bread!!!</title> 
            </head>
            <body>
                <h1>HTML Rendered!</h1>
                <div className="container"></div>
                {html.children}
            </body>
        </html>
    )
}


module.exports = Default;