import mongoose from "mongoose"
const taskSchema = new mongoose.Schema(
    {
        title:String,
        status:String,
        content:String,
        timeStart:Date,
        timeFinsh:Date,
        createdBy:String,
        listUser:Array,
        taskParentId:String,
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date

    }, {
    timestamps: true
}
);
const Task = mongoose.model('Task', taskSchema, "tasks");

export default Task;
