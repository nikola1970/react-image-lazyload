import React from "react";
import PropTypes from "prop-types";

const imageDefaultStyle = {
    display: "block",
    maxWidth: "none",
    width: "100%",
    height: "100%",
    minHeight: "100px",
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
            this.preloadImage(this.imageRef.current);
        }
    }

    preloadImage = img => {
        const src = img.getAttribute("data-src");
        img.src = src;
        img.style.opacity = 1;
    };

    intersectionConfig = {
        threshold: this.props.offset
    };

    observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.preloadImage(entry.target);
                self.disconnect();
            }
        });
    }, this.intersectionConfig);

    render() {
        const { alt, url } = this.props;
        return (
            <img
                data-src={url}
                alt={alt}
                ref={this.imageRef}
                style={imageDefaultStyle}
            />
        );
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
