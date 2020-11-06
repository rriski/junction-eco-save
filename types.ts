import { DefaultCtx, SessionContext, DefaultPublicData } from 'blitz'

<<<<<<< HEAD
=======
import { User } from 'db'
>>>>>>> 80fc7ee... Lint stuff

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface PublicData extends DefaultPublicData {
<<<<<<< HEAD
=======
    userId: User['id']
>>>>>>> 80fc7ee... Lint stuff
  }
}
