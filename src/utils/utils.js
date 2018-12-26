export default{
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },

    pagination(data,callback){
        let page = {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条数据`
            },
            showQuickJumper:true
        }
        return page;
    }
}