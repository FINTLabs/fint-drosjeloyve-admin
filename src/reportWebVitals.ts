const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
    if (onPerfEntry && typeof onPerfEntry === "function") {
        import("web-vitals").then(({onCLS, onLCP, onFCP, onTTFB, onINP}) => {
            onCLS(onPerfEntry)
            onLCP(onPerfEntry)
            onFCP(onPerfEntry)
            onTTFB(onPerfEntry)

            if (typeof onINP === "function") {
                onINP(onPerfEntry)
            }
        })
    }
}

export default reportWebVitals
