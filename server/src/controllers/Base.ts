import { Document, Model } from 'mongoose'

export default class BaseController <T extends Document> {
  protected model: Model<T>

  constructor (model: Model<T>) {
    this.model = model
  }

  public index (): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model.find({}, (error, docs) => { // default error type any here?
        if (error) {
          reject(error)
        } else {
          resolve(docs)
        }
      })
    })
  }

  public show (id: string): Promise<T>  {
    return new Promise((resolve, reject) => {
      this.model.findById(id, null, null, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  }

  public create (props: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.create(props, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  }

  public update (id: string, props: Partial<T>): Promise<string> {
    return new Promise((resolve, reject) => {
      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40584 didn't work this way
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      this.model.updateOne({ _id: id } as any, { $set: props } as any, null, (error, _) => { // default res type is any, and this is not a doc
        if (error) {
          reject(error)
        } else {
          resolve(id)
        }
      })
    })
  }

  public destroy (id: string) {
    return new Promise((resolve, reject) => {
      try {
        this.model.deleteOne({ _id: id }, null, (error) => {
          throw error
        })

        resolve(id)
      } catch (error) {
        reject(error)
      }
    })
  }
}

// ObjectId converted to string https://mongoosejs.com/docs/schematypes.html
