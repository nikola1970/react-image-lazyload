# Lazy loading image

Lazy loading image component made with new IntersectionObserver API

## Basic Usage

```js
import LazyImage from "LazyImage";

const imgUrl1 = "https://via.placeholder.com/1920x1000";
const imgUrl2 = "https://via.placeholder.com/1920x500";

class App extends Component {
    render() {
        return (
            <div className="App">
                // used to make some empty space
                <div className="preblock" />
                // LazyImage components (url prop is the only one that is required)
                <LazyImage url={imgUrl1} />
                <LazyImage url={imgUrl2} />
            </div>
        );
    }
}

export default App;
```

## Props

| Prop   | Type   | Required | Description                                                                      |
| :----- | :----- | :------: | :------------------------------------------------------------------------------- |
| url    | String |    ✓     | Image url                                                                        |
| offset | Number |          | Offset of the image element before we fire load event (0.5 = 50% of the element) |
| alt    | String |          | Image alt attribute                                                              |
