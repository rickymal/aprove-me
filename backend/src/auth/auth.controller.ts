import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class UserDTO {
    email : string
    password : string
}

@Controller('integration')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() authDTO: UserDTO) {
    return this.authService.register(authDTO.email, authDTO.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('auth')
  async authenticate(@Body() authDTO: UserDTO) {
    return this.authService.authenticate(authDTO.email, authDTO.password);
  }
}