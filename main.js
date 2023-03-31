import { useState, useEffect } from "react";

export default function Page() {
const [numPost, setNumPost] = useState(0);

useEffect(() => {
setNumPost(numPost + 1);
setNumPost(numPost + 1);
}, [3]);
return numPost;
}

console.log(Page());
