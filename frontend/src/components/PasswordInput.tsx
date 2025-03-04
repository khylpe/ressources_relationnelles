import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
       minLengthPasswdRegex,
       oneLowerCasePasswdRegex,
       oneUpperCasePasswdRegex,
       oneDigitPasswdRegex,
       oneSpecialCharPasswdRegex,
       authorizedCharsPasswdRegex
} from '@/utils/regex';
import { RuleObject } from 'antd/lib/form';
import type { FormItemProps } from 'antd/lib/form';

interface PasswordInputComponentProps extends FormItemProps {
       label: string;
       name: string;
       useRegex: boolean; // Nouvelle propriété pour permettre à l'utilisateur de choisir s'il veut utiliser la regex ou non
}

const PasswordInputComponent: React.FC<PasswordInputComponentProps> = ({ label, name, useRegex, ...props }) => {
       const [passwordValidationResults, setPasswordValidationResults] = useState({
              minLength: false,
              oneLowerCase: false,
              oneUpperCase: false,
              oneDigit: false,
              oneSpecialChar: false,
              noInvalidChar: true,
       });

       const passwordValidationRule = {
              validator: async (rule: RuleObject, password: string) => {
                     if (!password) {
                            return Promise.reject(new Error(undefined));
                     }

                     if (useRegex) {
                            if (!minLengthPasswdRegex.test(password)) {
                                   return Promise.reject(new Error("Le mot de passe doit contenir au moins 8 caractères"));
                            }
                            if (!oneLowerCasePasswdRegex.test(password)) {
                                   return Promise.reject(new Error("Le mot de passe doit contenir au moins une lettre minuscule"));
                            }
                            if (!oneUpperCasePasswdRegex.test(password)) {
                                   return Promise.reject(new Error("Le mot de passe doit contenir au moins une lettre majuscule"));
                            }
                            if (!oneDigitPasswdRegex.test(password)) {
                                   return Promise.reject(new Error("Le mot de passe doit contenir au moins un chiffre"));
                            }
                            if (!oneSpecialCharPasswdRegex.test(password)) {
                                   return Promise.reject(new Error("Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)"));
                            }
                            if (!authorizedCharsPasswdRegex.test(password)) {
                                   return Promise.reject(new Error("Le mot de passe contient des caractères non autorisés"));
                            }
                     }
                     return Promise.resolve();
              }
       };

       const validatePassword = (password: string) => {
              if (useRegex) {
                     setPasswordValidationResults({
                            minLength: minLengthPasswdRegex.test(password),
                            oneLowerCase: oneLowerCasePasswdRegex.test(password),
                            oneUpperCase: oneUpperCasePasswdRegex.test(password),
                            oneDigit: oneDigitPasswdRegex.test(password),
                            oneSpecialChar: oneSpecialCharPasswdRegex.test(password),
                            noInvalidChar: authorizedCharsPasswdRegex.test(password),
                     });
              } else {
                     // Réinitialiser les résultats de la validation si la regex n'est pas utilisée
                     setPasswordValidationResults({
                            minLength: false,
                            oneLowerCase: false,
                            oneUpperCase: false,
                            oneDigit: false,
                            oneSpecialChar: false,
                            noInvalidChar: true,
                     });
              }
       };

       const passwordTooltipContent = (
              <div>
                     <p className="text-white text-sm my-1">
                            {passwordValidationResults.minLength ?
                                   <CheckCircleOutlined className="mr-2" style={{ color: 'green' }} /> :
                                   <CloseCircleOutlined className="mr-2" style={{ color: 'red' }} />}
                            Au moins 8 caractères
                     </p>
                     <p className="text-white text-sm my-1">
                            {passwordValidationResults.oneLowerCase ?
                                   <CheckCircleOutlined className="mr-2" style={{ color: 'green' }} /> :
                                   <CloseCircleOutlined className="mr-2" style={{ color: 'red' }} />}
                            Au moins une lettre minuscule
                     </p>
                     <p className="text-white text-sm my-1">
                            {passwordValidationResults.oneUpperCase ?
                                   <CheckCircleOutlined className="mr-2" style={{ color: 'green' }} /> :
                                   <CloseCircleOutlined className="mr-2" style={{ color: 'red' }} />}
                            Au moins une lettre majuscule
                     </p>
                     <p className="text-white text-sm my-1">
                            {passwordValidationResults.oneDigit ?
                                   <CheckCircleOutlined className="mr-2" style={{ color: 'green' }} /> :
                                   <CloseCircleOutlined className="mr-2" style={{ color: 'red' }} />}
                            Au moins un chiffre
                     </p>
                     <p className="text-white text-sm my-1">
                            {passwordValidationResults.oneSpecialChar ?
                                   <CheckCircleOutlined className="mr-2" style={{ color: 'green' }} /> :
                                   <CloseCircleOutlined className="mr-2" style={{ color: 'red' }} />}
                            Au moins un caractère spécial (@$!%*?&)
                     </p>
                     <p className="text-white text-sm my-1">
                            {passwordValidationResults.noInvalidChar ?
                                   <CheckCircleOutlined className="mr-2" style={{ color: 'green' }} /> :
                                   <CloseCircleOutlined className="mr-2" style={{ color: 'red' }} />}
                            Aucun caractère non autorisé utilisé
                     </p>
              </div>
       );

       const allRulesRespected = () => {
              return Object.values(passwordValidationResults).every(Boolean);
       };

       return (
              <Form.Item
                     label={label}
                     name={name}
                     {...props}
                     tooltip={(useRegex && !allRulesRespected()) ? passwordTooltipContent : undefined}
                     rules={[{ required: true, message: 'Veuillez entrer votre mot de passe' }, passwordValidationRule]}
              >
                     <Input.Password maxLength={150} onChange={(e) => validatePassword(e.target.value)} />
              </Form.Item>
       );
};

export default PasswordInputComponent;