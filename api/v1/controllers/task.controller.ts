import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

export const index = async (req:Request, res:Response) =>{
    // FIND
    interface Find{
        deleted: boolean,
        status?: string, 
        title?: RegExp
    }
    const find: Find ={
        deleted:false,
    }

    if(req.query.status){
        find.status= req.query.status.toString();
    }
    //END FIND

    // Sort
    const sort = {};

    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }
    // End sort

    // Pagination
    let initPagination = {
        currentPage: 1,
        litmitItems: 2
    };
    const countTask = await Task.countDocuments(find);

    let objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTask
    )
    // End Pagination

    // search
    const objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    // end search 

    const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.litmitItems)
    .skip(objectPagination.skip);;

    res.json(tasks)
}

export const detail= async (req:Request, res:Response) =>{
    const id: string  = req.params.id;

    const task = await Task.find({
        _id:id,
        deleted:false
    });
    res.json(task)
}