import React from "react";
import PropTypes from "prop-types";

const imageDefaultStyle = {
    display: "block",
    maxWidth: "100%",
    height: "auto",
    minHeight: "20px",
    objectFit: "cover",
    transition: "opacity 0.5s",
    opacity: 0
};

class LazyImage extends React.Component {
    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        if (
            "IntersectionObserver" in window &&
            "IntersectionObserverEntry" in window &&
            "intersectionRatio" in window.IntersectionObserverEntry.prototype
        ) {
            this.observer.observe(this.imageRef.current);
        } else {
            this.loadImage(this.imageRef.current);
        }
    }

    tryFetchImage = url => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
            image.onerror = reject;
        });
    };

    loadImage = img => {
        const src = img.getAttribute("data-src");
        this.tryFetchImage(src)
            .then(() => {
                img.src = src;
            })
            .catch(() => {
                // img.src = ... here goes link for the broken image placeholder
                img.src =
                    "https://thewindowsclub-thewindowsclubco.netdna-ssl.com/wp-content/uploads/2018/06/Broken-image-icon-in-Chrome.gif";
            })
            .finally(() => (img.style.opacity = 1));
    };

    intersectionConfig = {
        threshold: this.props.offset
    };

    observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                self.disconnect();
            }
        });
    }, this.intersectionConfig);

    render() {
        const { alt, url } = this.props;
        return <img data-src={url} alt={alt} ref={this.imageRef} style={imageDefaultStyle} />;
    }
}

LazyImage.propTypes = {
    alt: PropTypes.string,
    offset: PropTypes.number,
    url: PropTypes.string.isRequired
};

LazyImage.defaultProps = {
    alt: "",
    offset: 0,
    url: "https://via.placeholder.com/550x350"
};

export default LazyImage;
