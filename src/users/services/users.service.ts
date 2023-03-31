import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/orm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  findOneByName(name: string): Promise<User> {
    return this.usersRepository.findOne({ name });
  }

  async authenticate(name: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ name });

    if (!user) {
      return user;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return null;
    }

    return user;
  }

  async createUser({ name, password, email }: Pick<User, 'name' | 'password' | 'email'>): Promise<User> {
    const existingUser = await this.findOneByName(name);

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const userId = uuidv4();
    
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = this.usersRepository.create({
      id: userId,
      name,
      password: passwordHash,
      email 
    });

    await this.usersRepository.save(user);

    return user;
  }
}
