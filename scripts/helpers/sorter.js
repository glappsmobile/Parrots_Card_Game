const sorter = {
    random: () => {
        return () => {return Math.random() - 0.5;}
    },
    highestToLowest: (property) => {
        return (a, b) => {
            const hasParameter = !!property; 
            if (!hasParameter){
                return b - a;
            } else if (hasParameter){
                    let result = parseFloat(b[property]) -  parseFloat(a[property]);
                    const aHasProperty = a[property] !== undefined;
                    const bHasProperty = b[property] !== undefined;

                        if (!aHasProperty){
                            result = 1;
                        } else if (!bHasProperty) {
                            result = -1;
                        }
                    
                    return result;
            }
        }
    }
}

