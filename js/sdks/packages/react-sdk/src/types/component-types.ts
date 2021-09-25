/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { LunaSecError } from '../../../isomorphic-common';

/** Gets called whenever the component experiences an error.  Will be called with a LunaSecError */
type errorHandlerCallback = (errorObject: LunaSecError) => void;

export interface BaseComponentProps {
  errorHandler: errorHandlerCallback;
  name?: string;
  /** a token to prefill the element with a secure value from a previous session */
  token?: string;
}

export interface SecureInputPropsWithoutValidator extends BaseComponentProps {
  placeholder?: string;
}

export interface SecureInputPropsWithValidator extends BaseComponentProps {
  /** The validator in the input you would like to run */
  validator: 'Email' | 'SSN' | 'EIN' | 'SSN_EIN';
  /** Must pass onValidate() callback when a validator is specified.  Use the callback to block the form from submitting and display user feedback.*/
  onValidate: (isValid: boolean) => void;
  placeholder?: string;
}

// Doesnt extend base props
export interface SecureUploadProps {
  errorHandler: errorHandlerCallback;
  name?: string;
  /** an array of file tokens to preload into the file picker */
  filetokens?: string[];
  /** Called when the files in the filepicker change with an array of tokens, either on addition or deletion */
  onTokenChange?: (token: Array<string>) => void;
}

export type SecureInputProps = SecureInputPropsWithoutValidator | SecureInputPropsWithValidator;
export type SecureTextAreaProps = BaseComponentProps;
export type SecureParagraphProps = BaseComponentProps;
export type SecureDownloadProps = BaseComponentProps;

/**
 * Used to represent all the possible secure props, used when the props could be any of these types
 * @ignore
 */
export type AnySecureProps =
  | SecureParagraphProps
  | SecureDownloadProps
  | SecureUploadProps
  | SecureTextAreaProps
  | SecureInputProps;

/** Used to pick the properties for a specific secure component*/
export interface SecurePropsLookup {
  Paragraph: SecureParagraphProps;
  Downloader: SecureDownloadProps;
  Uploader: SecureUploadProps;
  TextArea: SecureTextAreaProps;
  Input: SecureInputProps;
}
