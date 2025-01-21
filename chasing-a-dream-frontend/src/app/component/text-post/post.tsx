import React from "react";
interface PostData {
    baslik: string;
    posttext: string;
 
  }  
 
export default function Post({baslik}: PostData) {


    return (
        <div className="container">
            <div className="row">
              <div className="baslik">
            <h1>
                {baslik}    
            </h1>
              </div>
   <div className="textpost">

    
   </div>
              
              
               </div>
                   
    
        </div>
    );
}