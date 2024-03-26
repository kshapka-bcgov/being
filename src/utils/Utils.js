export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export function randomRadian() {
    return randomFloat(-Math.PI, Math.PI);
}

export function calc_distance(i,ii,j,jj) {
    return Math.pow(Math.pow(Math.abs(i-j),2) + Math.pow(Math.abs(ii-jj),2) , 0.5);
}