class factory{
    constructor(query,queryobj){
        this.query=query;
        this.queryobj=queryobj;
    };
    filter(){
        let queryObject={...this.queryobj};
        let exceptFields=['sort','select','limit','page','ketword'];
        exceptFields.forEach((field)=>{ delete queryObject[field]; });
        let queryString=JSON.stringify(queryObject);
        queryString.replace(/\b(gt|lt|lte|gte)\b/,(val)=> `$${val}`);
        queryObject=JSON.parse(queryString);
        this.query=this.query.find(queryObject);
        return this;
    };
    sort(){
        if(this.queryobj.sort){
            let sort=this.queryobj.sort.split(',').join(' ');
            this.query=this.query.sort(sort);
        }else{
            this.query=this.query.sort('-createdAt');
        };
        return this;
    };
    selectFields(){
        if(this.queryobj.select){
            let fields=this.queryobj.select.split(',').join(' ');
            this.query=this.query.select(fields);
        };
        return this;
    };
    search(){
        if(this.queryobj.keyword){
            let search={name:{$regex:this.queryobj.keyword}};
            this.query=this.query.find(search);
        };
        return this;
    };
    pagination(numOfDoc){
        let limit=this.queryobj.limit*1 || 10;
        let page=this.queryobj.page*1 || 1;
        let skip=(page-1)*limit;
        this.query=this.query.skip(skip).limit(limit);
        let paginationObj={};
        paginationObj.currentPage=page;
        paginationObj.numberOfPages=Math.ceil(numOfDoc/limit);
        if(skip>0){
            paginationObj.previousPage=page-1;
        };
        if(page*limit < numOfDoc){
            paginationObj.nextPage=page+1;
        };
        this.paginationObject=paginationObj;
        return this;
    };
}
module.exports=factory;