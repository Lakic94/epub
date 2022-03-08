import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
// import CFI from "epub-cfi-resolver";
import React from "react";
// import ePub from "epubjs";
// import "./stylesheet.css";
// import "./page_styles.css";
// import styled from "styled-components";
// import { createPortal } from "react-dom";
// const iiframe = styled(iframe)``

interface Nikola {
    data: any;
}

function App() {
    const [res, setRes] = useState<Nikola>({ data: null });
    const [res1, setRes1] = useState<string>();
    const node = React.useRef() as React.MutableRefObject<HTMLIFrameElement>;
    const [doc, setDoc] = React.useState<Document | null>();

    useEffect(() => {
        Axios.get("http://localhost:2020/").then((res: Nikola) => {
            console.log(res);
            setRes(res);
        });
    }, []);

    useEffect(() => {
        console.log(res);
        if (res.data === null) return;
        var parser = new DOMParser();
        // let a = parser.parseFromString(res.data[3].data, "text/xml");
        // console.log(a);
        // var rangeCFI =
        //     "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/3:2,/3:8)";
        // var cfi = new CFI(rangeCFI);
        // var uri = cfi.resolveURI(0, a, {
        //     ignoreIDs: false,
        // });
        // console.log(uri);
        // console.log( res.data[3].data);
        // console.log(res.data[3].data);
        console.log(res);

        let chap1DOM = parser.parseFromString(
            res.data[4].data,
            "application/xhtml+xml"
        );
        // var bookmark = cfi.resolveLast(chap1DOM, {
        //     ignoreIDs: true,
        // });
        // console.log(res.data[10].data);
        // console.log(JSON.parse(res.data[10].data));
        // import(res.data[10].data);
        // import(`${res.data[5].data}`);
        // console.log( chap1DOM);
        // var el = chap1DOM.querySelector(".calibre_7");
        // console.log(chap1DOM);
        console.log();
        chap1DOM.body.style.display = "block";
        chap1DOM.body.style.color = "white";

        let ser = new XMLSerializer().serializeToString(chap1DOM);
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

    // console.log(res1);

    // React.useEffect(() => {
    //     setDoc(node.current.contentDocument);
    // }, []);

    return (
        // <iframe title={"Naslov"} ref={node}>
        //     {console.log(res1)}
        //     {doc && res1 && createPortal(Test(res1), doc.body)}
        //     {console.log(doc)}
        // </iframe>
        <iframe
            srcDoc={res1}
            title={"naslov"}
            // style={{
            //     overflow: "hidden",
            //     overflowX: "hidden",
            //     overflowY: "hidden",
            //     height: "150%",
            //     width: "150%",
            //     position: "absolute",
            //     top: "0px",
            //     bottom: "0px",
            //     left: "0px",
            //     right: "0px",
            // }}
            style={{
                display: "block" /* iframes are inline by default */,
                background: "#000",
                border: "none" /* Reset default border */,
                width: window.innerWidth,
                height: window.innerHeight,
                color:'white'
            }}
        ></iframe>
    );
}

export default App;
