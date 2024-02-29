export default function loader({ src, width, quality }) {
  if (quality) {
    return `${src}?format=auto&quality=${quality}&width=${width}`;
  } else return `${src}?format=auto&width=${width}`;
}
