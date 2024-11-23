    <?xml version="1.0" encoding="UTF-8"?>
    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <xsl:template match="/">
            <html>
                <head>
                    <title>Sitemap</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h1 { color: #333; }
                        ul { list-style-type: none; }
                        li { margin: 5px 0; }
                    </style>
                </head>
                <body>
                    <h1>Sitemap</h1>
                    <ul>
                        <xsl:for-each select="urlset/url">
                            <li>
                                <a>
                                    <xsl:value-of select="loc"/>
                                </a>
                                <br/>
                                Last Modified: <xsl:value-of select="lastmod"/>
                                <br/>
                                Priority: <xsl:value-of select="priority"/>
                            </li>
                        </xsl:for-each>
                    </ul>
                </body>
            </html>
        </xsl:template>
    </xsl:stylesheet>