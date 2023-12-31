const userController=require("../controllers/user");
const followController=require("../controllers/follow");
const publicationController= require("../controllers/publication");
const commentController= require("../controllers/comment");
const likeController= require("../controllers/like");

const resolvers={
    Query:{
        //User
        getUser:(_,{id,username})=>userController.getUser(id,username),
        search:(_,{search})=>userController.search(search),

        //follow
        isFollow:(_,{username},ctx)=> followController.isFollow(username,ctx),
        getFollowers:(_,{username})=>followController.getFollowers(username),
        getFolloweds:(_,{username})=>followController.getFolloweds(username),
        getNotFolloweds:(_,{},ctx)=>followController.getNotFolloweds(ctx),

        //Publication
        getPublications:(_,{username})=>publicationController.getPublications(username),
        getPublicationsFolloweds:(_,{},ctx)=>publicationController.getPublicationsFolloweds(ctx),

        //Comment
        getComments:(_,{idPublication})=> commentController.getComments(idPublication),

        //like
        isLike:(_,{idPublication},ctx)=>likeController.isLike(idPublication,ctx),
        countLikes:(_,{idPublication})=>likeController.countLikes(idPublication),
        showsomething :()=>{
            console.log("this is a new query");
            return null;
        },
    },

    Mutation:{
        //user
        register: (_,{input})=>userController.register(input),//_ porque el dato no se usara
        login:(_,{input})=>userController.login(input),
        updateAvatar:(_,{file},ctx)=> userController.updateAvatar(file,ctx),
        deleteAvatar:(_,{},ctx)=>userController.deleteAvatar(ctx),
        updateUser:(_,{input},ctx)=>userController.updateUser(input,ctx),

        //follow
        follow:(_,{username},ctx)=>followController.follow(username,ctx),
        unFollow:(_,{username},ctx)=>followController.unFollow(username,ctx),
        
        //publication
        publish:(_,{file}, ctx)=>publicationController.publish(file,ctx),

        //Coments
        addComment:(_,{input},ctx)=>commentController.addComment(input,ctx),
        //likes
        addLike:(_,{idPublication},ctx)=>likeController.addLike(idPublication, ctx),
        deleteLike:(_,{idPublication},ctx)=>likeController.deleteLike(idPublication,ctx),


    },
};

module.exports=resolvers;