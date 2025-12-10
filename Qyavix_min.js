let h=[],i,R;export const u=v=>{let k=i++;return[h[k]??=v,n=>(h[k]=n?.call?n(h[k]):n,R())]};export const r=(C,e)=>(R=()=>{i=0,e.replaceChildren(C())},R());
