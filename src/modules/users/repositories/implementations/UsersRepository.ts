import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User()
    Object.assign(user,{
      name,
      email,
    })
    this.users.push(user)

    return user
  }

  findById(id: string): User | undefined {
    const user = this.users.find(u=>u.id===id)
    return user
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find(u=>u.email===email)
    return user
  }

  turnAdmin(receivedUser: User): User {
    const updatedUser = this.users.find(user=>user===receivedUser)
    updatedUser.admin = true

    this.users.map(user=> user.id===updatedUser.id
      ? updatedUser 
      : user
      )
    return updatedUser
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
