interface ObjectPagination {
    currentPage: number,
    litmitItems: number,
    skip?: number,
    totalPage?: number
}

const paginationHelper = (objectPagination: ObjectPagination,query: Record<string, any>, countRecord: number ): ObjectPagination =>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }

    if(query.limit){
        objectPagination.litmitItems=parseInt(query.limit);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) *objectPagination.litmitItems;
    
    const totalPage = Math.ceil(countRecord/objectPagination.litmitItems);
    objectPagination.totalPage = totalPage;
    return objectPagination;
}

export default paginationHelper;