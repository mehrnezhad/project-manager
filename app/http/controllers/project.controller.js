import {projectModel} from '../../models/project.js'

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text , image } = req.body
            let imageFile = image.replace(/\\/g,'/').substring(7)
            const owner = req.user._id
            const result = await projectModel.create({
                title,
                text,
                owner,
               image : imageFile
            })
            if (!result) throw { status: 400, message: 'پروژه ثبت نشد' }
            return res.json({
                status: 200,
                message: 'پروژه باموفقیت ایجاد شد'
            })
           
        } catch (error) {
           return next(error)
        }
    }
}

export const projectController = new ProjectController()