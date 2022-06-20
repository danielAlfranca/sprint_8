export interface APIResponse{

    count: number,​​​
    next: string,
    previous:null|string,
    results:Ship[]
}

export interface Ship{

    manufacturer: string,​​​
    name: string
}