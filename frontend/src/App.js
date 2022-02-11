import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import CFI from "epub-cfi-resolver";
import React from "react";
import ePub from "epubjs";
// import './stylesheet.css';
// import './page_styles.css'
import styled from "styled-components";

// const iiframe = styled(iframe)``

function App() {
    const [res, setRes] = useState(null);
    const [res1, setRes1] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:2020/").then((res) => {
            console.log(res);
            setRes(res);
        });
    }, []);

    useEffect(() => {
        console.log(res);
        if (res === null) return;
        var parser = new DOMParser();
        let a = parser.parseFromString(res.data[3].data, "text/xml");
        // console.log(a);
        var rangeCFI =
            "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/3:2,/3:8)";
        var cfi = new CFI(rangeCFI);
        // var uri = cfi.resolveURI(0, a, {
        //     ignoreIDs: false,
        // });
        // console.log(uri);
        // console.log( res.data[3].data);
        // console.log(res.data[3].data);
        let chap1DOM = parser.parseFromString(
            res.data[3].data,
            "application/xhtml+xml"
        );
        var bookmark = cfi.resolveLast(chap1DOM, {
            ignoreIDs: true,
        });
        // console.log(res.data[10].data);
        // console.log(JSON.parse(res.data[10].data));
        // import(res.data[10].data);
        // import(`${res.data[5].data}`);
        // console.log( chap1DOM);
        var el = chap1DOM.querySelector(".calibre_7");
        console.log(chap1DOM);
        let ser = new XMLSerializer().serializeToString(chap1DOM);
        // console.log(ser);
        setRes1(ser);
        // var c = CFI.generate(el, 0);
        // console.log(c);
        // cfi = new CFI(c);
        // console.log(cfi);
        // bookmark = cfi.resolveLast(chap1DOM, {
        //     ignoreIDs: true,
        // });
        // console.log(bookmark.node);
    }, [res]);

    console.log(res1);

    return (
        <div>
            <iframe
                title="nesto"
                srcDoc={res1}
                // style={{ width: "100%", height: "100%" }}
            ></iframe>
        </div>
    );
}

export default App;
